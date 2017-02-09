echo "Generating airports"

node generate_airports.js > ../src/components/airports.json

echo "Generating countries"

node generate_dots.js > ../src/components/dots.json