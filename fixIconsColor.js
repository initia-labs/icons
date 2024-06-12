const fs = require('fs');
const path = require('path');
const { glob } = require('glob');

// Directory to search for .svg files
const iconsDir = path.join(__dirname, 'icons');

// Pattern to match .svg files
const svgPattern = path.join(iconsDir, '*.svg');

// Function to replace text in files
function replaceFillColor(filePath) {
    fs.readFile(filePath, 'utf8', (_, data) => {
        // Replace 'fill="black"' with 'fill="currentColor"'
        const result = data.replace(/fill="black"/g, 'fill="currentColor"');

        // Write the modified content back to the file
        fs.writeFile(filePath, result, 'utf8');
    });
}

// Find all .svg files and replace the text
glob(svgPattern, (_, files) => {
    files.forEach(replaceFillColor);
});
