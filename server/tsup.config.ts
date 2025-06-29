import { defineConfig } from 'tsup'

export default defineConfig({
  entry: {
    server: 'src/server.ts',
    app: 'src/app.ts',
  },
  clean: true,
  format: 'esm',
  outDir: 'dist',
  splitting: false,
  sourcemap: false,
  minify: false,
  outExtension({ format }) {
    return {
      js: '.mjs'
    }
  }
})