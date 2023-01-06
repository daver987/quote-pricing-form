import { defineStore, acceptHMRUpdate } from 'pinia'
import { DirectionsResponse, Place } from '~/types/DirectionsResponse'

export const useQuoteStore = defineStore('useQuoteStore', {
  state: () => ({
    isRoundTrip: false,
    isItHourly: false,
    pickupDate: '00-00-0000',
    pickupTime: '00:00',
    returnPickupDate: '00-00-0000',
    returnPickupTime: '00:00',
    originName: 'Pickup Location',
    destinationName: 'Dropoff Location',
    vehicleTypeLabel: 'Standard Sedan',
    passengersLabel: '1 Passenger',
    serviceTypeLabel: 'Point to Point',
    totalFare: 0,
    rate: 0,
    vehicleImageSrc: '/images/cadillac-xts-1.png',
    vehicleImageAlt: 'Cadillac XTS',
    tripData: null as DirectionsResponse | null,
    placeDataOrigin: null as Place | null,
    placeDataDestination: null as Place | null,
    firstName: '',
    lastName: '',
    emailAddress: '',
    phoneNumber: '',
  }),
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useQuoteStore, import.meta.hot))
}
