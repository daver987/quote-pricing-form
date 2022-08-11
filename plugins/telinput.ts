import VueTelInput from 'vue-tel-input'

export default defineNuxtPlugin((nuxtApp) => {
  const globalOptions = {
    mode: 'auto',
  }
  nuxtApp.vueApp.use(VueTelInput, globalOptions)
})
