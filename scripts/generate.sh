echo "Generating airports"

node generate_airports.js > ../data/airports.json

echo "Generating cities"

node generate_cities.js > ../data/cities.json

echo "Generating countries (it will take a while)"

# node ./generate_dots.js > ./data/dots.json