import { ValidationSchema } from '~/schema/quoteFormValues'
import { Ref, ref } from 'vue'
import { rates } from '~/data/rates'
import { getRateFromId } from '~~/composables/useRateCalculator'
import { Rates } from '~/types/rates'

const calculateBase = (distance: number, min: number, km: number) => {
  return distance <= 25 ? minFare : (distance - 25) * km + min
}
const calculateTotal = (base: number) => 1.42 * base
const quoteFormValues = <ValidationSchema>{}

const {
  vehicleType = { value: 1, label: 'Standard SUV' },
  serviceType = { value: 1, label: 'Point to Point' },
  originData,
  destinationData,
  pickupDate = '08/16/2023',
  firstName = 'Steve',
  calculatedDistance = 44,
} = quoteFormValues

const { value: serviceId } = vehicleType
const calculatedServiceType = getRateFromId(serviceId, rates)
const minFare = calculatedServiceType?.min_rate_distance as number
const perKm = calculatedServiceType?.per_km as number
const distance = calculatedDistance
const total = calculateTotal(
  calculateBase(distance, minFare, perKm) as unknown as number
)
total.toFixed(2)

const vehicleImage = ref(
  'https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/8c7c6a8d-06ad-4278-1c70-9d497b1cb200/1024'
) as Ref<string>
