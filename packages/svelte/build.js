const fs = require('fs-extra')
const path = require('path')
const { globSync } = require('glob')

function createComponent(svg) {
  return `<script lang="ts">
export let size: number = 16
export let color: string = "currentColor"
</script>

{@html \`${svg
    .replaceAll('width="16"', 'width="${size}"')
    .replaceAll('height="16"', 'height="${size}"')
    .replaceAll('fill="currentColor"', 'fill="${color}"')}\`}
`
}

// delete files from previous builds
fs.rmSync(path.join(__dirname, './src'), { recursive: true, force: true })

// create directory with the components
fs.mkdirSync(path.join(__dirname, './src'))

// exports that will be included in index.tsx
const indexFile = []

// for each icon on the source dir
const icons = globSync(path.join(__dirname, '../../icons', '*.svg'))

icons.forEach((filePath) => {
  const fileName = path.basename(filePath)
  const iconName = fileName.substring(0, fileName.length - 4)
  const svgContent = fs.readFileSync(filePath).toString()

  fs.writeFileSync(
    path.join(__dirname, './src', `${iconName}.svelte`),
    createComponent(svgContent),
  )

  indexFile.push(`export ${iconName} from './${iconName}.svelte'`)
})

fs.writeFileSync(path.join(__dirname, './src/index.ts'), indexFile.join('\n'))