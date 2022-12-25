// @ts-ignore
import { Vue3ReactiveTelInput } from 'vue3-reactive-tel-input'

export default defineNuxtPlugin((nuxtApp) => {
  const VueTelInputOptions = {
    mode: 'international',
  }
  nuxtApp.vueApp.use(Vue3ReactiveTelInput, VueTelInputOptions)
})
