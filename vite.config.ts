import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

const isEditor = process.env.VITE_EDITOR === 'true'

export default defineConfig({
  plugins: [
    react(),
    !isEditor && dts({
      insertTypesEntry: true,
      exclude: ['**/*.stories.tsx', '**/*.test.tsx']
    })
  ].filter(Boolean),
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer]
    }
  },
  ...(isEditor
    ? {
        root: __dirname,
        build: {
          outDir: 'dist-editor',
          rollupOptions: {
            input: {
              editor: resolve(__dirname, 'editor.html')
            }
          }
        }
      }
    : {
        build: {
          lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'MyLibComponents',
            formats: ['es', 'cjs'],
            fileName: (format) => `index.${format === 'es' ? 'js' : 'cjs'}`
          },
          rollupOptions: {
            external: ['react', 'react-dom'],
            output: {
              globals: {
                react: 'React',
                'react-dom': 'ReactDOM'
              }
            }
          }
        }
      })
})
