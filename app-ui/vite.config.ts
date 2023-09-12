import {defineConfig} from 'vite';
import mkcert from 'vite-plugin-mkcert'
import {existsSync} from 'node:fs';

const serverHasCert = existsSync(fileURLToPath(new URL('../cert/ca.pem', import.meta.url)))

export default defineConfig({
  plugins: [mkcert()],
  build: {
    outDir: '../public'
  },
  server: {
    port: 1091,
    https: true,
    proxy: {
      '/api': {
        target: (serverHasCert ? 'https' : 'http') + '://0.0.0.0:2040',
        secure: false,
      }
    }
  }
})