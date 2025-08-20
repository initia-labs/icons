# Contributing to @initia/icons

Thank you for your interest in contributing to the @initia/icons library! This guide will walk you through the process of adding new icons to the library.

## Prerequisites

Before contributing, make sure you have:

- Node.js >= 22
- pnpm package manager

## Adding New Icons

### Step 1: Create Your Icon

1. Create your SVG icon file with a 16x16 viewBox
2. Use descriptive PascalCase naming (e.g., `ArrowLeft.svg`, `CheckCircleFilled.svg`)
3. Ensure your icon uses `currentColor` for its fill/stroke so it can be styled dynamically

### Step 2: Add the Icon to the Repository

1. Fork and clone the repository
2. Place your SVG file in the `icons/` directory at the root of the project
3. The SVG should follow these guidelines:
   - Use a 16x16 viewBox: `viewBox="0 0 16 16"`
   - Use `currentColor` for colors that should be themeable

### Step 3: Build the Library

Run the following commands from the project root:

```bash
# Install dependencies
pnpm install

# Build the icon libraries
pnpm run build
```

This will:

1. Optimize your SVG using SVGO (automatically converts colors to `currentColor`)
2. Generate React components in `packages/react/`
3. Build the distribution files

### Step 4: Test Your Icon

You can test your new icon using the demo application:

```bash
# Start the demo app
pnpm dev
```

Open your browser and navigate to the provided URL to see all icons, including your new addition.

### Step 5: Submit Your Contribution

1. Commit your changes with a descriptive message:

   ```bash
   git add icons/YourNewIcon.svg
   git commit -m "Add YourNewIcon icon"
   ```

2. Push to your fork and create a pull request
