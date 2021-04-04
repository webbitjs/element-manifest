import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify-es';
import resolve from '@rollup/plugin-node-resolve';

export default [
  {
    input: './src/index.js',
    output: {
      file: './dist/webbit-element-manifest.js',
      format: 'umd',
      name: 'webbitElementManifest'
    },
    plugins: [
      resolve(),
      babel()
    ]
  },
  {
    input: './src/index.js',
    output: {
      file: './dist/webbit-element-manifest.min.js',
      format: 'umd',
      name: 'webbitElementManifest'
    },
    plugins: [
      resolve(),
      babel(),
      uglify()
    ]
  }
]