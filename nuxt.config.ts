// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  future: {
    compatibilityVersion: 4,
  },
  devtools: { enabled: false },
  ssr: false,
  // Disable the loading screen which can hang in some environments
  spaLoadingTemplate: false,
  modules: ['@nuxt/ui', '@nuxtjs/color-mode'],
  colorMode: {
    classSuffix: '',
    preference: 'system',
    fallback: 'light',
  },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      '@tailwindcss/postcss': {},
    },
  },
  // Ensure we bind to the correct port and host for the platform
  devServer: {
    port: 3000,
    host: '0.0.0.0'
  },
  // Disable HMR as per platform guidelines
  vite: {
    server: {
      hmr: false
    },
    optimizeDeps: {
      include: ['vue', '@vue/runtime-core']
    }
  },
  experimental: {
    payloadExtraction: false
  },
  build: {
    transpile: ['lucide-vue-next']
  },
  runtimeConfig: {
    apiServerBaseUrl: process.env.API_SERVER_BASE_URL || 'http://localhost:5215',
    cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
    cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
    cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,
  }
})
