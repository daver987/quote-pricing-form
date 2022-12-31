import { ValidationSchema } from '~/schema/quoteFormValues'
import { rates } from '~/data/rates'
import { Rates, Surcharges } from '~/types/Rates'
import { surcharges } from '~/data/rates'
import {
  getRateFromId,
  getBaseRate,
  getSurchargeAmounts,
  round,
} from '~/composables/useRateCalculator'

export default defineEventHandler(async (event) => {
  const body = await readBody<ValidationSchema>(event)
  const {
    firstName,
    lastName,
    emailAddress,
    phoneNumber,
    selectedVehicleType,
    isHourly,
    selectedServiceType,
    selectedNumberOfHours,
    tripData,
    selectedPassengers,
  } = body
  const { distanceValue } = tripData
  const { value: hours } = selectedNumberOfHours
  const rate = getRateFromId(selectedVehicleType.value, rates)
  const baseRate = getBaseRate(isHourly, hours, distanceValue, rate as Rates)
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
    isHourly,
    hours,
    distanceValue,
    selectedServiceType,
    selectedPassengers,
  }
})
