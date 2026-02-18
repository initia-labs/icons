const fs = require("fs");
const path = require("path");
const { globSync } = require("glob");

const ICONS_DIR = path.join(__dirname, "icons");
const OUTPUTS = [
  path.join(__dirname, "llms.txt"),
  path.join(__dirname, "demo/public/llms.txt"),
];

// Scan icons and sort alphabetically
const icons = globSync(path.join(ICONS_DIR, "*.svg"))
  .map((filePath) => path.basename(filePath, ".svg"))
  .sort((a, b) => a.localeCompare(b));

// Build llms.txt content
const content = `# @initia/icons-react

> React icon components for the Initia ecosystem. Each SVG icon is wrapped as a React component with a consistent props API for color, size, and styling.

## Install

\`\`\`bash
pnpm add @initia/icons-react
\`\`\`

## Import

All icons are named exports prefixed with \`Icon\`:

\`\`\`tsx
import { IconWarning, IconArrowRight } from "@initia/icons-react";
\`\`\`

## Props

- \`color\` (string, default \`"currentColor"\`): Fill color of the icon
- \`size\` (number, default \`16\`): Width and height in pixels
- \`style\` (React.CSSProperties): Inline styles
- \`className\` (string): CSS class name
- \`indeterminate\` (boolean): Indeterminate state (loader icons)

## Usage

\`\`\`tsx
import { IconWarning } from "@initia/icons-react";

function App() {
  return <IconWarning />;
}
\`\`\`

Custom color and size:

\`\`\`tsx
<IconWarning color="#ff0000" size={24} />
\`\`\`

Because the default fill is \`currentColor\`, the icon inherits the text color:

\`\`\`tsx
<span style={{ color: "blue" }}>
  <IconWarning />
</span>
\`\`\`

## Available Icons

${icons.map((name) => `- Icon${name}`).join("\n")}
`;

// Write outputs
for (const outputPath of OUTPUTS) {
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(outputPath, content);
  console.log(`Generated ${outputPath}`);
}
console.log(`${icons.length} icons`);
