const fs = require('fs')
const path = require('path')
const { globSync } = require('glob')
const { optimize } = require('svgo')
const parseSvgPath = require('svg-path-parser')

const ROOT_DIR = __dirname
const ICONS_DIR = path.join(ROOT_DIR, 'icons')
const ALLOWED_ELEMENTS = new Set(['svg', 'path'])
const ICON_FILE_NAME = /^[A-Z][A-Za-z0-9]*\.svg$/

function lintSvg(source, fileName, sourcePath = fileName) {
  const errors = []
  const warnings = []
  let pathCount = 0
  let svgCount = 0

  if (!ICON_FILE_NAME.test(fileName)) {
    errors.push('file name must be PascalCase')
  }

  const lintPlugin = {
    name: 'lintIcon',
    fn: () => ({
      element: {
        enter: (node, parentNode) => {
          const { attributes } = node

          if (!ALLOWED_ELEMENTS.has(node.name)) {
            errors.push(`<${node.name}> is not allowed; use only <svg> and <path>`)
          }

          for (const name of Object.keys(attributes)) {
            if (name === 'stroke' || name.startsWith('stroke-')) {
              errors.push(`<${node.name}> must not use the ${name} attribute`)
            }
            if (name === 'color' || name.endsWith('-color')) {
              errors.push(`<${node.name}> must not use the ${name} attribute`)
            }
            if (name === 'style') {
              errors.push(`<${node.name}> must not use the style attribute`)
            }
          }

          if (node.name === 'svg') {
            svgCount += 1
            if (parentNode.type !== 'root') {
              errors.push('<svg> must be the document root')
            }
            if (attributes.width !== '16' || attributes.height !== '16') {
              errors.push('<svg> width and height must both be 16')
            }
            if (attributes.viewBox !== '0 0 16 16') {
              errors.push('<svg> viewBox must be "0 0 16 16"')
            }
            if (attributes.fill !== 'none') {
              errors.push('<svg> fill must be "none"')
            }
          }

          if (node.name === 'path') {
            pathCount += 1
            if (parentNode.type !== 'element' || parentNode.name !== 'svg') {
              errors.push('<path> must be a direct child of <svg>')
            }
            if (attributes.d == null || attributes.d === '') {
              errors.push('<path> must have a non-empty d attribute')
            } else {
              try {
                parseSvgPath(attributes.d)
              } catch {
                errors.push('<path> must have valid SVG path data')
              }
            }
            if (attributes.fill !== 'currentColor') {
              errors.push('<path> fill must be "currentColor"')
            }
          }
        },
      },
      text: {
        enter: (node) => {
          if (node.value.trim() !== '') {
            errors.push('text content is not allowed')
          }
        },
      },
    }),
  }

  try {
    optimize(source, { path: sourcePath, plugins: [lintPlugin] })
  } catch (error) {
    errors.push(error instanceof Error ? error.message : String(error))
  }

  if (svgCount !== 1) {
    errors.push('file must contain exactly one <svg> element')
  }
  if (pathCount === 0) {
    errors.push('file must contain at least one <path> element')
  } else if (pathCount > 1) {
    warnings.push(
      `contains ${pathCount} paths; prefer one compound path when practical`,
    )
  }

  return { errors, warnings }
}

function lintIcon(filePath) {
  try {
    const source = fs.readFileSync(filePath, 'utf8')
    return lintSvg(source, path.basename(filePath), filePath)
  } catch (error) {
    return {
      errors: [error instanceof Error ? error.message : String(error)],
      warnings: [],
    }
  }
}

function run(requestedFiles) {
  const iconFiles = (
    requestedFiles.length > 0
      ? requestedFiles.map((filePath) => path.resolve(filePath))
      : globSync(path.join(ICONS_DIR, '*.svg'))
  ).toSorted()

  if (iconFiles.length === 0) {
    console.error('No SVG icons found')
    return 1
  }

  let errorCount = 0
  let warningCount = 0

  for (const filePath of iconFiles) {
    const { errors, warnings } = lintIcon(filePath)
    const displayPath = path.relative(ROOT_DIR, filePath)

    for (const error of errors) {
      console.error(`ERROR ${displayPath}: ${error}`)
      errorCount += 1
    }
    for (const warning of warnings) {
      console.warn(`WARN  ${displayPath}: ${warning}`)
      warningCount += 1
    }
  }

  console.log(
    `Linted ${iconFiles.length} icons: ${errorCount} errors, ${warningCount} warnings`,
  )

  if (errorCount > 0) {
    return 1
  }

  return 0
}

if (require.main === module) {
  process.exitCode = run(process.argv.slice(2))
}

module.exports = { lintIcon, lintSvg, run }
