var request = require('request');
var async = require('async');
var _ = require('lodash');

var citiesData = []

request({url: 'http://trip2.dev/api/destinations', json: true}, (err, res, body) => {
    var continents = body
        .filter(continent => continent.parent_id == null)

    var countries = body
        .filter(country => continents.find(continent => continent.id === country.parent_id))
    
    var cities = body
        .filter(city => countries.find(country => country.id === city.parent_id))
    
    async.each(cities, (city, cb) => {
        var cityData = {}
        request(
            { url: 'http://api.geonames.org/searchJSON?formatted=true&q='+city.name+'&maxRows=1&username=kristjanjansen&style=full&lang=et', json: true},
            (err, res, body) => {
                if (body.totalResultsCount > 0) {
                    var data = body.geonames[0]
                    cityData.lat = data.lat,
                    cityData.lng = data.lng,
                    cityData.data = {
                        name: city.name,
                        capital: data.fcodeName === 'capital of a political entity',
                        geonameId: data.geonameId,
                        population: data.population
                    }
                } else {
                    cityData.data = { name: city.name },
                    cityData.lat = 0,
                    cityData.lng = 0
                }
                citiesData.push(cityData)
                setTimeout(cb, 200)
            }
        )
    }, () => {
        var output = {
            "type": "FeatureCollection",
            "features": _.sortBy(citiesData, 'name').map(cityData => {
                return {
                    "type":"Feature",
                    "properties": cityData.data,
                    "geometry":{"type":"Point","coordinates":[parseFloat(cityData.lng),parseFloat(cityData.lat)]}
                }
            })
        }
        console.log(JSON.stringify(output, null, 4))
    })


});