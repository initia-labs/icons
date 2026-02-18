# @initia/icons-react

## Install

```bash
pnpm add @initia/icons-react
```

## Import

All icons are named exports prefixed with `Icon`:

```tsx
import { IconWarning, IconArrowRight } from "@initia/icons-react";
```

## Props

| Prop            | Type                  | Default          | Description                        |
| --------------- | --------------------- | ---------------- | ---------------------------------- |
| `color`         | `string`              | `"currentColor"` | Fill color of the icon             |
| `size`          | `number`              | `16`             | Width and height in pixels         |
| `style`         | `React.CSSProperties` | —                | Inline styles                      |
| `className`     | `string`              | —                | CSS class name                     |
| `indeterminate` | `boolean`             | —                | Indeterminate state (loader icons) |

## Usage

### Basic

```tsx
import { IconWarning } from "@initia/icons-react";

function App() {
  return <IconWarning />;
}
```

### Custom color and size

```tsx
<IconWarning color="#ff0000" size={24} />
```

### Inheriting color from parent

Because the default fill is `currentColor`, the icon inherits the text color:

```tsx
<span style={{ color: "blue" }}>
  <IconWarning />
</span>
```

## Available Icons
