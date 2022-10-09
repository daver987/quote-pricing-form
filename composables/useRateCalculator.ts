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

//Function that takes the Rates array of rate objects and returns the correct rate object by the id
const getRateFromId = (id: number, rates: Rates[]) => {
  return rates.find((rate) => rate.id === id)
}

//Function that takes the rate object checks to see if the pricing in hourly or by distance then calculates the base
// rate
function getBaseRate(
  isHourly: boolean,
  numHours: number,
  numKms: number,
  rate: Rates,
) {
  if (isHourly) {
    if (numHours < rate.min_hours_hourly) {
      return rate.min_rate_hourly
    } else {
      return round(rate.per_hour * numHours)
    }
  } else {
    if (numKms < rate.min_distance) {
      return rate.min_rate_distance
    } else {
      return round(
        rate.min_rate_distance + (numKms - rate.min_distance) * rate.per_km,
      )
    }
  }
}

//Function that takes the surcharge object, destructures it and calculates the surcharges individually
const getSurchargeAmounts = (baseRate: number, surcharges: Surcharges) => {
  return {
    fuelSurcharge: round(baseRate * surcharges.fuelSurcharge),
    gratuity: round(baseRate * surcharges.gratuity),
    HST: round(baseRate * surcharges.HST),
  }
}

//custom rounding function for rounding to the nearest cent with high precision
const round = (num: number) => {
  let m = Number((Math.abs(num) * 100).toPrecision(15))
  return (Math.round(m) / 100) * Math.sign(num)
}

export { getRateFromId, getBaseRate, getSurchargeAmounts, round }
