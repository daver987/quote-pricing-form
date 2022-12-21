export default defineNuxtConfig({
  typescript: {
    shim: false,
  },
  nitro: {
    preset: 'vercel',
  },

  modules: ['@pinia/nuxt', 'nuxt-quasar-vite', '@unocss/nuxt', '@vueuse/nuxt'],
  build: {
    transpile: ['quasar', 'vue3-q-tel-input', '@googlemaps/js-api-loader'],
  },
  runtimeConfig: {
    HUBSPOT_ACCESS_TOKEN: process.env.HUBSPOT_ACCESS_TOKEN,
    public: {
      GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
    },
  },
  css: ['vue3-q-tel-input/dist/vue3-q-tel-input.esm.css'],
  quasar: {
    // Optional string | boolean
    sassVariables: 'assets/styles/quasar.variables.scss',
    // Optional string[]
    // If you use animations, add Quasar Extra CSS animation URL here.
    css: ['@quasar/extras/material-icons/material-icons.css'],
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
