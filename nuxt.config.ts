// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  nitro: {
    preset: 'cloudflare',
  },
  modules: ['@pinia/nuxt', '@nuxtjs/tailwindcss', '@vueuse/nuxt'],
  runtimeConfig: {
    public: { GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY },
  },
  build: {
    transpile: [
      'vue-tel-input',
      '@headlessui/vue',
      '@heroicons/vue',
      '@headlessui/tailwindcss',
      '@vuepic/vue-datepicker',
    ],
  },
  css: [
    'vue-tel-input/dist/vue-tel-input.css',
    '@vuepic/vue-datepicker/dist/main.css',
  ],
})
