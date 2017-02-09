echo "Generating airports"

node generate_airports.js > ../data/airports.json

echo "Generating countries"

node generate_dots.js > ../data/dots.json