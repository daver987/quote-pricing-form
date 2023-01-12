import { defineStore, acceptHMRUpdate } from 'pinia'

export const useQuoteStore = defineStore('useQuoteStore', {
  state: () => ({
    quoteNumber: 0 as number | null,
    isRoundTrip: false,
    quoteData: '' as unknown,
  }),
  getters: {
    //
  },
  actions: {
    //
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useQuoteStore, import.meta.hot))
}
