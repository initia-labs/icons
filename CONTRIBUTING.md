# Contributing Icons

This guide explains how to add new icons to the `@initia/icons-react` package.

## Prerequisites

- Node >= 22.13
- pnpm
- rollup

## Adding a New Icon

### 1. Prepare the SVG file

Place your SVG file in the `icons/` folder. The file name must be **PascalCase** (e.g. `FilterSearch.svg`, `ArrowDown.svg`, `CheckCircleFilled.svg`). The file name becomes the exported React component name prefixed with `Icon` — for example, `Warning.svg` becomes `<IconWarning />`.

### 2. SVG Requirements

Every SVG file **must** follow these rules:

#### Allowed elements

The SVG must contain only `<svg>` and `<path>` elements. Do not use `<g>`, `<defs>`, `<clipPath>`, `<mask>`, `<circle>`, `<rect>`, `<use>`, or any other elements. If your source SVG contains these, flatten/expand them into raw `<path>` elements before adding the file.

#### Fill color

All `fill` attributes must be set to `"currentColor"`. This allows consumers to control the icon color via CSS. **Do not** use hardcoded colors like `#000`, `black`, `white`, `#FF0000`, etc.

The build pipeline runs SVGO with the `convertColors` plugin (`currentColor: true`), which converts some color values automatically. However, you should still set `fill="currentColor"` explicitly to avoid issues with colors that the plugin may not catch.

#### Viewbox and dimensions

Icons should use a **16x16** viewBox:

```xml
<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="..." fill="currentColor"/>
</svg>
```

### 3. Example of a valid icon

```xml
<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M7.96742 0C8.65914 0 9.30405..." fill="currentColor"/>
</svg>
```

### 4. Example of an invalid icon

```xml
<!-- BAD: uses <g>, <circle>, and hardcoded fill color -->
<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(0, 0)">
    <circle cx="8" cy="8" r="8" fill="#000000"/>
    <path d="M4 4L12 12" stroke="black"/>
  </g>
</svg>
```

### 5. Build and verify

After adding your SVG file:

```sh
pnpm i
pnpm run build
```

This will:

1. Run **SVGO** to optimize all SVGs in `icons/` (auto-converts colors to `currentColor`)
2. Generate React components from every SVG in `icons/`
3. Bundle the package via Rollup

### 6. Preview

To preview your icon in the demo app:

```sh
pnpm run dev
```

## Checklist

Before submitting your icon, verify:

- [ ] File is in `icons/` with a **PascalCase** name (e.g. `MyIcon.svg`)
- [ ] SVG contains only `<svg>` and `<path>` elements — no `<g>`, `<defs>`, `<clipPath>`, etc.
- [ ] All fills are set to `"currentColor"`
- [ ] ViewBox is `0 0 16 16`
- [ ] `pnpm run build` completes without errors
