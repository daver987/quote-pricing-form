import { defineStore, acceptHMRUpdate } from 'pinia'

export const useDealStore = defineStore('useDealStore', {
  state: () => {
    return {
      pickup_date: '',
      pickup_time: '',
      pickup_address: '',
      service_type: null as FormOptions,
      vehicle_type: null as FormOptions,
      number_of_hours: null as FormOptions,
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
