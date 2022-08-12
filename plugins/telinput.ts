import VueTelInput from 'vue-tel-input'

export default defineNuxtPlugin((nuxtApp) => {
  const globalOptions = {
    mode: 'international',
  }
  nuxtApp.vueApp.use(VueTelInput, globalOptions)
})
