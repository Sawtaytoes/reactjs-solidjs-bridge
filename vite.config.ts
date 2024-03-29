import {
  defineConfig,
} from 'vite'
import solidPlugin from 'vite-plugin-solid'
import reactPlugin from '@vitejs/plugin-react'

import {
  narrowSolidPlugin,
} from './narrowSolidPlugin'

// const restrictedSolidPlugin = solidPlugin()

// const solidPluginTransform = (
//   restrictedSolidPlugin
//   .transform
// )

// restrictedSolidPlugin
// .transform = (
//   function(ast, id) {
//     return (
//       id
//       .includes(
//         '/src/solid'
//       )
//       ? (
//         // @ts-expect-error
//         solidPluginTransform(
//           ...arguments
//         )
//       )
//       : null
//     )
//   }
// )

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: 'ESNext',
  },
  define: {
    'global': {},
  },
  plugins: [
    // restrictedSolidPlugin,
    // solidPlugin(),
    narrowSolidPlugin({ include: /\/src\/solid/ }),
    reactPlugin(),
    // reactPlugin({
    //   // exclude: './src/solid',
    //   // include: /react\/.+\.(js|jsx|ts|tsx)$/,
    //   // include: './src/react',
    // }),
  ],
})
