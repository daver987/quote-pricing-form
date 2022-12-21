export interface Rates {
  id: number
  name: string
  per_km: number
  per_hour: number
  min_hours_hourly: number
  min_rate_hourly: number
  min_distance: number
  min_rate_distance: number
}

export interface Surcharges {
  fuelSurcharge: number
  gratuity: number
  HST: number
}
