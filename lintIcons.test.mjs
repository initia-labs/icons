import { createRequire } from 'node:module'
import { describe, expect, it } from 'vitest'

const require = createRequire(import.meta.url)
const { lintSvg } = require('./lintIcons.js')

function createIcon(pathData) {
  return `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="${pathData}" fill="currentColor"/></svg>`
}

describe('lintSvg', () => {
  it('accepts valid SVG path data', () => {
    const result = lintSvg(createIcon('M3,7 5-6L1,7 1e2-.4Z'), 'Valid.svg')

    expect(result.errors).toEqual([])
  })

  it('rejects a missing viewBox', () => {
    const source = createIcon('M0 0L1 1').replace(
      ' viewBox="0 0 16 16"',
      '',
    )
    const result = lintSvg(source, 'MissingViewBox.svg')

    expect(result.errors).toContain('<svg> viewBox must be "0 0 16 16"')
  })

  it.each([
    'not a path',
    'M0 0 L',
    'M0 0 Z garbage',
    'M0 0A1 1 0 2 0 1 1',
    'M0 0,,L1 1',
  ])(
    'rejects invalid SVG path data: %s',
    (pathData) => {
      const result = lintSvg(createIcon(pathData), 'Invalid.svg')

      expect(result.errors).toContain('<path> must have valid SVG path data')
    },
  )
})
