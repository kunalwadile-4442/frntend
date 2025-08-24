#!/bin/bash

# Define the file path
FILE="./build/index.html"

# Check if the file exists
if [ -f "$FILE" ]; then
    sed -i 's|href="logo192.png"|href="https://ts.appristine.in/logo192.png"|g' "$FILE"
    sed -i 's|href="manifest.json"|href="https://ts.appristine.in/manifest.json"|g' "$FILE"
    echo "Replacement done successfully!"
else
    echo "Error: File $FILE not found!"
fi