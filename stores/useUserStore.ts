import { defineStore, acceptHMRUpdate } from 'pinia'

export const useUserStore = defineStore('useUserStore', {
  state: () => ({ userId: '' }),
  getters: {
    //
  },
  actions: {
    //
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
