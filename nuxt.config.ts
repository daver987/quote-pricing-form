import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  nitro: {
    preset: 'cloudflare',
  },
  modules: ['@pinia/nuxt', '@nuxtjs/tailwindcss', 'nuxt-quasar-vite'],
  build: {
    transpile: ['quasar'],
  },
  runtimeConfig: {
    apiSecret: process.env.HUBSPOT_ACCESS_TOKEN,
    public: {
      MAPS_API_KEY: process.env.MAPS_API_KEY,
    },
  },
  css: ['vue-tel-input/dist/vue-tel-input.css'],
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
  // sourcemap: false,
})
