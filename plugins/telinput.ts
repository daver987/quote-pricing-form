import VueTelInput from 'vue-tel-input/dist/vue-tel-input.es'

export default defineNuxtPlugin((nuxtApp) => {
  const globalOptions = {
    mode: 'auto',
  }
  nuxtApp.vueApp.use(VueTelInput, globalOptions)
})
