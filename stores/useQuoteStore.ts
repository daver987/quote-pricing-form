import { defineStore, acceptHMRUpdate } from 'pinia'

export const useQuoteStore = defineStore('useQuoteStore', {
  state: () => {
    return {
      quoteFormValues: {},
    }
  },
  actions: {},
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useQuoteStore, import.meta.hot))
}
