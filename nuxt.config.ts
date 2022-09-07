import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  typescript: {
    shim: false,
  },
  ssr: false,
  nitro: {
    preset: 'cloudflare',
  },

  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    ['nuxt3-quasar'],
    '@vueuse/nuxt',
  ],
  build: {
    transpile: ['quasar', 'vue3-q-tel-input', '@googlemaps/js-api-loader'],
  },
  runtimeConfig: {
    apiSecret: process.env.HUBSPOT_ACCESS_TOKEN,
    public: {
      MAPS_API_KEY: process.env.MAPS_API_KEY,
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
    /* Quasar UI config -- you'll notice in Quasar docs when you need it */
    config: {
      dark: false,
    },
  },
})
