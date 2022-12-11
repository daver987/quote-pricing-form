// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  nitro: {
    preset: 'cloudflare',
  },
  modules: ['@pinia/nuxt', '@nuxtjs/tailwindcss', '@vueuse/nuxt'],
  build: {
    transpile: [
      'vue-tel-input',
      '@headlessui/vue',
      '@heroicons/vue',
      '@headlessui/tailwindcss',
      '@vuepic / vue - datepicker',
    ],
  },
  runtimeConfig: {
    HUBSPOT_ACCESS_TOKEN: process.env.HUBSPOT_ACCESS_TOKEN,
    public: {
      MAPS_API_KEY: process.env.MAPS_API_KEY,
    },
  },
  css: [
    'vue-tel-input/dist/vue-tel-input.css',
    '@vuepic/vue-datepicker/dist/main.css',
  ],
})
