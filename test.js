var turf = require('@turf/turf')
var countries = require('./src/components/countries.json')

var geojson = {"type":"FeatureCollection","features":[
{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[61.210817,35.650072],[62.230651,35.270664],[66.518607,37.362784],[67.83,37.144994],[71.541918,37.905774],[74.980002,37.41999],[75.158028,37.133031],[71.846292,36.509942],[70.881803,33.988856],[68.926677,31.620189],[66.346473,29.887943],[62.549857,29.318572],[60.874248,29.829239],[60.52843,33.676446],[61.210817,35.650072]]]},"properties":{"name":"Afghanistan"},"id":"AFG"},
]}

var centroid = turf.centroid(geojson.features[0]);

// console.log(centroid)

var lat = 0
var lon = 0
var step = 3
var halfStep = step / 2

var features = []


for (var lat = 40; lat > -40; lat -= step) {
for (var lon = -40; lon < 40; lon += step) {

var box = turf.polygon([[
    [lon - halfStep, lat + halfStep],
    [lon + halfStep, lat + halfStep],
    [lon + halfStep, lat - halfStep],
    [lon - halfStep, lat - halfStep],
    [lon - halfStep, lat + halfStep]
]])
var circle = turf.circle(turf.point([lon, lat]), halfStep, 8, 'degrees')
var point = turf.point([lon, lat]);

circle.properties.countries = []

countries.features.forEach(function(country) {
    
    if (country.geometry.type === 'Polygon' && country.properties.name !== 'Antarctica') {
        var intersection = turf.intersect(
                box,
                turf.polygon(country.geometry.coordinates)
            )
        if (intersection !== undefined) {
            circle.properties.countries.push(country.properties.name)
        }
    } 
    /*
    if (country.geometry.type === 'Polygon' &&
        turf.intersect(
            box,
            box
        ) == undefined
    ) { 
        features.push(circle)
    }
    */
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
