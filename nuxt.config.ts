export default defineNuxtConfig({
  nitro: {
    preset: 'cloudflare',
  },
  formkit: {
    ///
  },
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    'nuxt-headlessui',
    '@formkit/nuxt',
  ],
  headlessui: {
    prefix: 'Headless',
  },
  runtimeConfig: {
    public: { GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY },
  },
  build: {
    transpile: ['vue-tel-input', '@heroicons/vue', 'date-fns'],
  },
  css: [
    'vue-tel-input/dist/vue-tel-input.css',
    'assets/css/tailwind.css',
    'assets/css/main.css',
  ],
})
