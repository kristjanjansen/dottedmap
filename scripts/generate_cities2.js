var request = require('request');
var async = require('async');
var _ = require('lodash');

var destinations = require('./destinations.json')

var citiesData = []

    var continents = destinations
        .filter(continent => continent.parent_id == null)

    var countries = destinations
        .filter(country => continents.find(continent => continent.id === country.parent_id))
    
    var cities = destinations
        .filter(city => countries.find(country => country.id === city.parent_id))
    
    async.each(cities, (city, cb) => {
        var cityData = {}
        request(
            { url: 'http://api.geonames.org/searchJSON?formatted=true&q='+city.name+'&maxRows=1&username=kristjanjansen&style=full&lang=et', json: true},
            (err, res, body) => {
                if (body.totalResultsCount > 0) {
                    var data = body.geonames[0]
                    cityData = {
                        id: city.id,
                        name: city.name,
                        lat: data.lat,
                        lon: data.lng,
                        capital: data.fcodeName === 'capital of a political entity',
                        geonameId: data.geonameId,
                        population: data.population
                    }
                } else {
                    // http://api.geonames.org/getJSON?geonameId=2622320&username=kristjanjansen
                    cityData = {
                        id: city.id,
                        name: city.name,
                        //lat: 0,
                        //lon: 0
                        geonameId: 0
                    }
                }
                citiesData.push(cityData)
                setTimeout(cb, 50)
            }
        )
    }, () => {
        noresult = _.sortBy(citiesData, 'id')
            .filter(city => city.geonameId == 0)
        console.log(JSON.stringify(noresult, null, 4))

        /*console.log('\n<?php\n\nreturn [\n')
        _.sortBy(citiesData, 'id')
            .filter(city => city.geonameId !== 0)
            .forEach(city => {
    
                console.log(`    ${city.id} => [
        'name' => "${city.name}",
        'lat' => ${city.lat},
        'lon' => ${city.lon},
        'capital' => ${city.capital},
        'population' => ${city.population},
        'geoname' => ${city.geonameId},
    ],`);
            
            })
    
        console.log('\n];\n')
        */
    })

/*

<?php

return [
725 => [
  'code' => 'AF',
  'capital' => 'Kabul',
  'area' => 652230,
  'population' => '29121286',
  'callingCode' => '93',
  'currencyCode' => 'AFN',
],

*/
