## Installation

``` bash
yarn
npm run dev
```

## Data Sources

It is assumed you have https://csvkit.readthedocs.io installed

### Borders

https://github.com/johan/world.geo.json/blob/master/countries.geo.json
(with ISO3 country codes)

```
curl https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json > scripts/countries.json
```
### ISO codes

https://github.com/datasets/country-codes/blob/master/data/country-codes.csv

```
curl https://raw.githubusercontent.com/datasets/country-codes/master/data/country-codes.csv | cat routes.dat | csvcut | csvjson -i 4 > scripts/routes.json
```

### Airport routes

http://openflights.org/data.html

```
curl https://raw.githubusercontent.com/jpatokal/openflights/master/data/routes.dat | csvcut -H | csvjson -i 4 > scripts/routes.json
```

### Airport codes

http://openflights.org/data.html

```
curl https://raw.githubusercontent.com/jpatokal/openflights/master/data/airports.dat | csvcut -H | csvjson -i 4 > scripts/airports.json
```