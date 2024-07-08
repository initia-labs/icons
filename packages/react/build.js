const fs = require('fs-extra')
const path = require('path')
const { globSync } = require('glob')

function createComponent(name) {
  return `import { ReactComponent as Icon } from './icon.svg'

export function Icon${name}({
  color,
  size,
  style,
  ...props
}: {
  color?: string
  size?: number
  style?: React.CSSProperties
  className?: string
  indeterminate?: boolean
}) {
  return (
    <Icon
      fill={color || 'currentColor'}
      style={{ ...style, transform: \`scale(\${(size || 16)/16})\` }}
      {...props}
    />
  )
}`
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

  const componentDirName = path.join(__dirname, './src', iconName.toLowerCase())

  fs.mkdirSync(componentDirName)

  fs.copySync(filePath, path.join(componentDirName, 'icon.svg'))

  fs.writeFileSync(
    path.join(componentDirName, `${iconName}.tsx`),
    createComponent(iconName),
  )

  indexFile.push(`export * from './${iconName.toLowerCase()}/${iconName}'`)
})

fs.writeFileSync(path.join(__dirname, './src/index.ts'), indexFile.join('\n'))
