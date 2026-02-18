const fs = require("fs");
const path = require("path");
const { globSync } = require("glob");

const TEMPLATE_PATH = path.join(__dirname, "demo/AGENT_INSTRUCTIONS.md");
const ICONS_DIR = path.join(__dirname, "icons");
const OUTPUTS = [
  path.join(__dirname, "md/ICONS.md"),
  path.join(__dirname, "demo/public/ICONS.md"),
];

// Read template
const template = fs.readFileSync(TEMPLATE_PATH, "utf-8");

// Scan icons and sort alphabetically
const icons = globSync(path.join(ICONS_DIR, "*.svg"))
  .map((filePath) => path.basename(filePath, ".svg"))
  .sort((a, b) => a.localeCompare(b));

// Build list
const list = ["", ...icons.map((name) => `- Icon${name}`), ""].join("\n");

// Write outputs
const content = template + list;
for (const outputPath of OUTPUTS) {
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(outputPath, content);
  console.log(`Generated ${outputPath}`);
}
console.log(`${icons.length} icons`);
