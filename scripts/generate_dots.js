var turf = require('@turf/turf')
var countries = require('./countries.json')

var lat = 0
var lon = 0
var step = 2.5
var halfStep = step / 2

var features = []

for (var lat = 80; lat > -80; lat -= step) {

    for (var lon = -180; lon < 180; lon += step) {

        var box = turf.polygon([[
            [lon - halfStep, lat + halfStep],
            [lon + halfStep, lat + halfStep],
            [lon + halfStep, lat - halfStep],
            [lon - halfStep, lat - halfStep],
            [lon - halfStep, lat + halfStep]
        ]])
        var circle = turf.circle(turf.point([lon, lat]), halfStep, 8, 'degrees')
        var circle = turf.point([lon, lat]);

        circle.properties.countries = []

        countries.features
            .filter(country => country.properties.name !== 'Antarctica')
            .forEach(country => {
            
            if (country.geometry.type === 'Polygon') {
                var intersection = turf.intersect(
                    box,
                    turf.polygon(country.geometry.coordinates)
                )
                if (intersection !== undefined) {
                    circle.properties.countries.push(country.properties.name)
                }
            }
            if (country.geometry.type === 'MultiPolygon') {
                country.geometry.coordinates.forEach(polygon => {
                    var intersection = turf.intersect(
                        box,
                        turf.polygon(polygon)
                    )
                    if (intersection !== undefined) {
                        circle.properties.countries.push(country.properties.name)
                    }
                })
            }
        })

        if (circle.properties.countries.length > 0) {
            features.push(circle)
        }

    }
}

var output = {
  "type": "FeatureCollection",
  "features": features
}

console.log(JSON.stringify(output))