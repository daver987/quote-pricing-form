// @ts-ignore
import VueTelInput from 'vue-tel-input'
export default defineNuxtPlugin((nuxtApp) => {
  const VueTelInputOptions = {
    mode: 'international',
  }
  nuxtApp.vueApp.component('VueTelInput', VueTelInputOptions)
})
