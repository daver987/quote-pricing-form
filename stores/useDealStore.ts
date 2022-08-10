import { defineStore, acceptHMRUpdate } from 'pinia'

export const useDealStore = defineStore('useDealStore', {
  state: () => {
    return {
      pickup_date: '',
      pickup_time: '',
      service_type: undefined as FormOptions,
      vehicle_type: undefined as FormOptions,
      num_hours: 0,
      num_passengers: undefined,
      is_round_trip: false,
      getDealResponse: null,
    }
  },
})

export interface FormOptions {
  label: string
  value: number
}

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDealStore, import.meta.hot))
}
