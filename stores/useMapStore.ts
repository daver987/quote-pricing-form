import { defineStore, acceptHMRUpdate } from 'pinia'

export const useMapStore = defineStore('useMapStore', {
  state: () => {
    return {
      origin_location: '',
      origin_location_type: '',
      destination_location: '',
      destination_location_type: '',
      distance_traveled: 0,
      duration_traveled: 0,
    }
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMapStore, import.meta.hot))
}
