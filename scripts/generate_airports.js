// cat routes.dat | csvcut -H | csvjson -i 4 > routes.json

/*

1 Airline 2-letter (IATA) or 3-letter (ICAO) code of the airline.
2 Airline ID  Unique OpenFlights identifier for airline (see Airline).
3 Source airport  3-letter (IATA) or 4-letter (ICAO) code of the source airport.
4 Source airport ID   Unique OpenFlights identifier for source airport (see Airport)
5 Destination airport 3-letter (IATA) or 4-letter (ICAO) code of the destination airport.
6 Destination airport ID  Unique OpenFlights identifier for destination airport (see Airport)
7 Codeshare   "Y" if this flight is a codeshare (that is, not operated by Airline, but another carrier), empty otherwise.
8 Stops   Number of stops on this flight ("0" for direct)
9 Equipment   3-letter codes for plane type(s) generally used on this flight, separated by spaces
*/

var routes = require('./routes.json')
var airports = require('./airports.json')
var _ = require('lodash')

var airportKeys = []

routes.forEach(route => {
    airportKeys.push(route.column3)
    airportKeys.push(route.column5)
})

airportKeys = _.uniq(airportKeys)

airports = airports
    .filter(airport => {
        return airport.hasOwnProperty('lat')
            && airport.hasOwnProperty('lon')
            && airportKeys.indexOf(airport.iata) !== -1
    })
    .map(airport => {
        return {
            iata: airport.iata,
            lat: airport.lat,
            lon: airport.lon
        }
    })

console.log(JSON.stringify(airports))