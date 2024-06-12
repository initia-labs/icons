import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import svgr from '@svgr/rollup'

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.cjs.js',
      format: 'cjs',
      sourcemap: true,
      exports: 'named',
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [
    svgr({
      exportType: 'named',
      namedExport: 'ReactComponent',
      icon: true,
    }),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
      declaration: true,
      declarationDir: 'dist',
    }),
  ],
  external: ['react', 'react-dom'],
}
