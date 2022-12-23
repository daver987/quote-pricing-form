export default defineNuxtConfig({
  typescript: {
    shim: false,
  },
  nitro: {
    preset: 'vercel',
  },

  experimental: {
    writeEarlyHints: true,
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  modules: [
    '@pinia/nuxt',
    'nuxt-quasar-vite',
    '@vueuse/nuxt',
    'nuxt-headlessui',
    '@nuxtjs/tailwindcss',
    '@nuxt/image-edge',
  ],
  build: {
    transpile: [
      'quasar',
      'vue3-q-tel-input',
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
  css: [
    'vue3-q-tel-input/dist/vue3-q-tel-input.esm.css',
    'quasar/dist/quasar.css',
    '@quasar/extras/material-icons/material-icons.css',
  ],
  quasar: {
    // Optional string | boolean
    // Optional string[]
    // If you use animations, add Quasar Extra CSS animation URL here.
    // List of extra Quasar Plugins
    // auto-installed: [Platform, Body, Dark, Screen, History, Lang, IconSet]
    // optional: [AddressBarColor, AppFullscreen, AppVisibility, BottomSheet, Dialog,
    //            LoadingBar, Loading, Notify, LocalStorage, SessionStorage]
    // /* Quasar UI config -- you'll notice in Quasar docs when you need it */
    config: {
      dark: false,
    },
  },
})
