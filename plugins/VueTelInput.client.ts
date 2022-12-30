// @ts-ignore
import Vue3ReactiveTelInput from 'vue3-reactive-tel-input'
export default defineNuxtPlugin((nuxtApp) => {
  const VueTelInputOptions = {
    mode: 'international',
    onlyCountries: ['NG', 'GH', 'GB', 'US', 'CA'],
  }
  nuxtApp.vueApp.use(Vue3ReactiveTelInput, VueTelInputOptions)
})
