![Icons](./cover.png)
## How to build
Add or change the icons inside the `icons/` folder.

Then run:
```sh
pnpm i
pnpm run build
```

> You need to have node >= 20, pnpm and rollup installed locally.

## Usage (React)

```js
import { IconName } from "@initia/icons-react"

<IconName color="white" size={50}/>
```

Both props (color and size) are oprional, these are the default values:

Prop          | Default value
------------- | -------------
color         | "currentColor"
size          | 16

### Usage (Svelte)

Still work in progress