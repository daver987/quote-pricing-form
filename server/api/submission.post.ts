import { ValidationSchema } from '~/schema/quoteFormValues'
import { rates } from '~/data/rates'
import { Rates, Surcharges } from '~/types/Rates'
import { surcharges } from '~/data/rates'
import {
  getRateFromId,
  getBaseRate,
  getSurchargeAmounts,
} from '~/composables/useRateCalculator'

export default defineEventHandler(async (event) => {
  const body = await readBody<ValidationSchema>(event)
  const {
    calculatedDistance,
    firstName,
    lastName,
    emailAddress,
    phoneNumber,
    selectedVehicleType,
    isItHourly,
    isRoundTrip,
    pickupDate,
    pickupTime,
    placeDataDestination,
    placeDataOrigin,
    selectedServiceType,
    selectedNumberOfHours,
    tripData,
    selectedPassengers,
  } = body
  const {
    distanceText,
    distanceValue,
    durationText,
    durationValue,
    endLat,
    endLng,
    startLat,
    startLng,
  } = tripData
  const {
    formatted_address: originFormattedAddress,
    name: originName,
    place_id: originPlaceId,
  } = placeDataOrigin
  const {
    formatted_address: destinationFormattedAddress,
    name: destinationName,
    place_id: destinationPlaceId,
  } = placeDataDestination
  const { value: hoursValue, label: hoursLabel } = selectedNumberOfHours || {
    value: 0,
    label: '0 hrs',
  }
  const { value: passengersValue, label: passengersLabel } =
    selectedPassengers || { value: 0, label: '1 Passenger' }
  const { value: vehicleTypeValue, label: vehicleTypeLabel } =
    selectedVehicleType || { value: 0, label: 'Standard' + ' Sedan' }
  const { value: serviceTypeValue, label: serviceTypeLabel } =
    selectedServiceType || { value: 0, label: 'Point To Point' }
  const rate = getRateFromId(serviceTypeValue, rates)
  const baseRate = getBaseRate(
    isItHourly,
    hoursValue as number,
    distanceValue,
    rate as Rates
  )
  const computedSurcharges = getSurchargeAmounts(
    baseRate,
    surcharges as unknown as Surcharges
  )

  const { fuelSurcharge, gratuity, HST } = computedSurcharges
  return {
    rate,
    statusCode: 200,
    body,
    firstName,
    lastName,
    emailAddress,
    phoneNumber,
    fuelSurcharge,
    gratuity,
    HST,
    baseRate,
    isItHourly,
    hoursValue,
    distanceValue,
    distanceText,
    selectedServiceType,
    selectedPassengers,
    calculatedDistance,
    durationText,
    durationValue,
    endLat,
    endLng,
    startLat,
    startLng,
    originFormattedAddress,
    originName,
    originPlaceId,
    destinationFormattedAddress,
    destinationName,
    destinationPlaceId,
    pickupDate,
    pickupTime,
    vehicleTypeLabel,
    vehicleTypeValue,
    serviceTypeLabel,
    serviceTypeValue,
    passengersLabel,
    passengersValue,
    hoursLabel,
    isRoundTrip,
  }
})
