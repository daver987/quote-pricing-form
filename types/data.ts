export type SelectedServiceType = {
  label: string
  value: number
}

export type SelectedVehicleType = {
  label: string
  value: number
}

export type SelectedNumberOfHours = {
  label: string
  value: number
}

export type SelectedPassengers = {
  label: string
  value: number
}

export type TripData = {
  distanceValue: number
  distanceText: string
  durationValue: number
  durationText: string
  startLat: number
  startLng: number
  endLat: number
  endLng: number
}

export type PlaceDataOrigin = {
  formatted_address: string
  name: string
  place_id: string
  types: string[]
}

export type PlaceDataDestination = {
  formatted_address: string
  name: string
  place_id: string
  types: string[]
}

export type Data = {
  pickupDate: string
  pickupTime: string
  returnPickupDate: string
  returnPickupTime: string
  selectedServiceType: SelectedServiceType
  selectedVehicleType: SelectedVehicleType
  selectedNumberOfHours: SelectedNumberOfHours
  selectedPassengers: SelectedPassengers
  firstName: string
  lastName: string
  emailAddress: string
  phoneNumber: string
  isRoundTrip: boolean
  isItHourly: boolean
  tripData: TripData
  placeDataOrigin: PlaceDataOrigin
  placeDataDestination: PlaceDataDestination
  calculatedDistance: number
}

export type data = {
  success: boolean
  data: Data
}
