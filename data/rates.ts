import { Rates, Surcharges } from '~/types/rates'

const rates = [
  {
    id: 1,
    name: 'Standard Sedan',
    per_km: 1.7,
    per_hour: 80,
    min_hours_hourly: 2,
    min_rate_distance: 80,
    min_distance: 25,
    min_rate_hourly: 160,
  },
  {
    id: 2,
    name: 'Premium Sedan',
    per_km: 1.95,
    per_hour: 90,
    min_hours_hourly: 2,
    min_rate_distance: 90,
    min_distance: 25,
    min_rate_hourly: 180,
  },
  {
    id: 3,
    name: 'Standard SUV',
    per_km: 2.2,
    per_hour: 105,
    min_hours_hourly: 2,
    min_rate_distance: 105,
    min_distance: 25,
    min_rate_hourly: 210,
  },
  {
    id: 4,
    name: 'Premium SUV',
    per_km: 2.7,
    per_hour: 128,
    min_hours_hourly: 2,
    min_rate_distance: 128,
    min_distance: 25,
    min_rate_hourly: 256,
  },
] as Rates[]

const surcharges = [
  {
    fuelSurcharge: 0.08,
    gratuity: 0.2,
    HST: 0.13,
  },
] as Surcharges[]

export { rates, surcharges }
