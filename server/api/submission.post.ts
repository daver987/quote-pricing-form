import { ValidationSchema } from '~/schema/quoteFormValues'
import { rates } from '~/data/rates'
import { Rates, Surcharges } from '~/types/Rates'
import { surcharges } from '~/data/rates'
import {
  getRateFromId,
  getBaseRate,
  getSurchargeAmounts,
} from '~/composables/useRateCalculator'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

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
    returnPickupDate,
    returnPickupTime,
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
    selectedVehicleType || { value: 0, label: 'Standard Sedan' }

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

  await prisma.user.create({
    data: {
      firstName,
      lastName,
      emailAddress,
      phoneNumber,
      quotes: {
        create: {
          pickupDate,
          pickupTime,
          returnPickupDate,
          returnPickupTime,
          originFormattedAddress,
          originName,
          originPlaceId,
          startLat,
          startLng,
          destinationFormattedAddress,
          destinationName,
          destinationPlaceId,
          endLat,
          endLng,
          serviceTypeLabel,
          serviceTypeValue,
          vehicleTypeLabel,
          vehicleTypeValue,
          passengersLabel,
          passengersValue,
          isItHourly,
          hoursLabel,
          hoursValue,
          isRoundTrip,
          distanceText,
          distanceValue,
          durationText,
          durationValue,
          calculatedDistance,
          baseRate,
          fuelSurcharge,
          gratuity,
          HST,
        },
      },
    },
  })

  return {
    rate,
    statusCode: 200,
    body,
    pickupDate,
    pickupTime,
    returnPickupDate,
    returnPickupTime,
    originName,
    originFormattedAddress,
    originPlaceId,
    startLat,
    startLng,
    destinationName,
    destinationFormattedAddress,
    destinationPlaceId,
    endLat,
    endLng,
    serviceTypeLabel,
    serviceTypeValue,
    vehicleTypeLabel,
    vehicleTypeValue,
    passengersLabel,
    passengersValue,
    isItHourly,
    hoursValue,
    hoursLabel,
    firstName,
    lastName,
    emailAddress,
    phoneNumber,
    isRoundTrip,
    distanceValue,
    distanceText,
    durationText,
    durationValue,
    calculatedDistance,
    baseRate,
    fuelSurcharge,
    gratuity,
    HST,
  }
})
