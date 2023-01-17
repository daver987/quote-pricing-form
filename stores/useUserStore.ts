import { defineStore, acceptHMRUpdate } from 'pinia'

export const useUserStore = defineStore('useUserStore', {
  state: () => ({
    hplUserId: '' as string | null,
    firstName: '',
    lastName: '',
    emailAddress: '',
    phoneNumber: '',
    stripeCustomerId: null as string | null,
  }),
  getters: {
    //
  },
  actions: {
    setUserData(userData: any) {
      this.hplUserId = userData.id
      this.firstName = userData.firstName
      this.lastName = userData.lastName
      this.emailAddress = userData.emailAddress
      this.phoneNumber = userData.phoneNumber
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
