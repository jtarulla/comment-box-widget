import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'
import { createVuePlugin as vue } from 'vite-plugin-vue2'
import Components from 'unplugin-vue-components/vite'
import { VuetifyResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  plugins: [
    vue(),
    Components({
      resolvers: [VuetifyResolver()],
    }),
  ],
  css: {
    preprocessorOptions: {
      sass: {
        additionalData: [
          // vuetify variable overrides
          '@import "@/assets/styles/variables"',
          '',
        ].join('\n'),
      },
    },
  },
  optimizeDeps: {
    // exclude Vuetify since it takes forever to pre-bundle in StackBlitz
    exclude: ['vuetify/lib', 'vuetify/lib/framework'],
  },
  build: {
    brotliSize: false, // unsupported in StackBlitz
  },
})
