import { defineStore, acceptHMRUpdate } from 'pinia'

export const useCartStore = defineStore('useCartStore', {
  state: () => ({ addedToCart: false }),
  getters: {
    //
  },
  actions: {
    addToCart() {
      this.addedToCart = true
    },
    removeFromCart() {
      this.addedToCart = false
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot))
}
