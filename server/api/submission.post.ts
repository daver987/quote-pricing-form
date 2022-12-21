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
    vehicleType,
    isHourly,
    numberOfHours,
    tripData,
  } = body
  const { distanceValue } = tripData
  const { value: hours } = numberOfHours
  const rate = getRateFromId(vehicleType.value, rates())
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
  }
})
