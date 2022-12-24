export default defineNuxtConfig({
  typescript: {
    shim: false,
  },
  nitro: {
    preset: 'cloudflare-pages',
  },

  experimental: {
    writeEarlyHints: true,
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  modules: [
    '@pinia/nuxt',
    '@vueuse/nuxt',
    'nuxt-headlessui',
    '@nuxtjs/tailwindcss',
    '@nuxt/image-edge',
  ],
  build: {
    transpile: [
      '@googlemaps/js-api-loader',
      '@heroicons/vue',
      '@headlessui/vue',
    ],
  },
  headlessui: {
    prefix: 'Headless',
  },
  runtimeConfig: {
    HUBSPOT_ACCESS_TOKEN: process.env.HUBSPOT_ACCESS_TOKEN,
    public: {
      GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
    },
  },
})
