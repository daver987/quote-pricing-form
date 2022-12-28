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
    '@nuxtjs/tailwindcss',
    '@nuxt/image-edge',
  ],
  build: {
    transpile: [
      '@googlemaps/js-api-loader',
      '@heroicons/vue',
      '@headlessui/vue',
      'libphonenumber-js',
      'vue3-reactive-tel-input',
    ],
  },
  runtimeConfig: {
    HUBSPOT_ACCESS_TOKEN: process.env.HUBSPOT_ACCESS_TOKEN,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
    public: {
      GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
    },
  },
})
