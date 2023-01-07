import { ValidationSchema } from '~/schema/quoteFormValues'
import { PlaceDataDestination, PlaceDataOrigin, TripData } from '~/types/data'
import { rates, surcharges } from '~/data/rates'
import { Rates, Surcharges } from '~/types/Rates'
import {
  getBaseRate,
  getRateFromId,
  getSurchargeAmounts,
} from '~/composables/useRateCalculator'
import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const supabase = serverSupabaseClient(event)
  try {
    const body = await readBody(event)
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
      returnDate,
      returnTime,
      placeDataDestination,
      placeDataOrigin,
      selectedServiceType,
      selectedNumberOfHours,
      tripData,
      selectedPassengers,
    } = body.data as ValidationSchema

    const {
      distanceText,
      distanceValue,
      durationText,
      durationValue,
      endLat,
      endLng,
      startLat,
      startLng,
    } = tripData as TripData

    const isPearson = (origin: string) => {
      if (origin === 'Toronto Pearson International Airport') {
        return true
      }
    }

    const {
      formatted_address: originFormattedAddress,
      name: originName,
      place_id: originPlaceId,
    } = placeDataOrigin as PlaceDataOrigin

    const isPearsonAirportPickup = isPearson(originName)

    const {
      formatted_address: destinationFormattedAddress,
      name: destinationName,
      place_id: destinationPlaceId,
    } = placeDataDestination as PlaceDataDestination

    const isPearsonAirportDropoff = isPearson(destinationName)

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

    const { value: selectedHours, label: selectedHoursLabel } =
      selectedNumberOfHours || { value: 0, label: 'Hours Not Selected' }

    const rate = getRateFromId(serviceTypeValue, rates)

    const baseRate = getBaseRate(
      isItHourly,
      selectedHours,
      calculatedDistance,
      rate as Rates
    )

    const computedSurcharges = getSurchargeAmounts(
      baseRate,
      surcharges as unknown as Surcharges
    )
    const { fuelSurcharge, gratuity, HST } = computedSurcharges

    const calculatedTotal = () => {
      if (isPearsonAirportPickup) {
        return baseRate + fuelSurcharge + gratuity + HST + 15
      }
      if (!isPearsonAirportPickup) {
        return baseRate + fuelSurcharge + gratuity + HST
      }
      if (isPearsonAirportPickup || (isPearsonAirportDropoff && isRoundTrip)) {
        return (baseRate + fuelSurcharge + gratuity + HST) * 2 + 15
      }
      if (!isPearsonAirportDropoff && !isPearsonAirportPickup && isRoundTrip) {
        return (baseRate + fuelSurcharge + gratuity + HST) * 2
      }
    }

    // add a user to the database
    const addUser = async () => {
      const { data, error } = await supabase
        .from('user')
        .upsert({
          // @ts-ignore
          firstName,
          lastName,
          emailAddress,
          phoneNumber,
        })
        .select()
      console.log('This is the returned data', data)
      console.log('This is the returned error', error)
    }

    //increment the quote number
    interface QuoteNumber {
      latest_quote_number: number
    }
    //get the latest quote number
    const getQuoteNumber = async () => {
      const { data } = await supabase
        .from('quote_number')
        .select('latest_quote_number')
        .single()
      console.log('This is the returned quote number', data)
      return data as QuoteNumber
    }

    const { latest_quote_number } = await getQuoteNumber()

    //increment and update the quote number
    const incrementedQuoteNumber = async () => {
      const updatedQuoteNumber = latest_quote_number + 1
      const { data } = await supabase
        .from('quote_number')
        // @ts-ignore
        .update({ latest_quote_number: updatedQuoteNumber })
        .eq('id', '1')
      console.log('This is the updated quote number, data', data)
      return updatedQuoteNumber
    }
    const quoteNumber = await incrementedQuoteNumber()
    console.log('This is the new returned quote number', quoteNumber)

    //add the quote to the database
    const addQuote = async () => {
      const { data, error } = await supabase
        .from('quotes')
        .upsert({
          // @ts-ignore
          pickupDate: pickupDate,
          pickupTime: pickupTime,
          isRoundTrip: isRoundTrip,
          returnDate: returnDate,
          returnTime: returnTime,
          originFormattedAddress: placeDataOrigin.formatted_address,
          originName: placeDataOrigin.name,
          originPlaceId: placeDataOrigin.place_id,
          startLat: tripData.startLat,
          startLng: tripData.startLng,
          destinationFormattedAddress: placeDataDestination.formatted_address,
          destinationName: placeDataDestination.name,
          destinationPlaceId: placeDataDestination.place_id,
          endLat: tripData.endLat,
          endLng: tripData.endLng,
          vehicleTypeLabel: selectedVehicleType.label,
          vehicleTypeValue: selectedVehicleType.value,
          serviceTypeLabel: selectedServiceType.label,
          serviceTypeValue: selectedServiceType.value,
          passengersLabel: selectedPassengers.label,
          passengersValue: selectedPassengers.value,
          isItHourly: isItHourly,
          // @ts-ignore
          hoursLabel: selectedHoursLabel,
          // @ts-ignore
          hoursValue: selectedHours,
          distanceText: tripData.distanceText,
          distanceValue: tripData.distanceValue,
          durationText: tripData.durationText,
          durationValue: tripData.durationValue,
          calculatedDistance: calculatedDistance,
          baseRate,
          fuelSurcharge,
          gratuity,
          HST,
          userEmail: emailAddress,
          totalFare: calculatedTotal(),
          quote_number: quoteNumber,
          firstName,
          lastName,
        })
        .select()
      console.log('This is the returned quote data', data)
      console.log('This is the returned quote error', error)
    }
    await addUser()
    await addQuote()

    return {
      rate,
      statusCode: 200,
      body,
      pickupDate,
      pickupTime,
      returnDate,
      returnTime,
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
      totalFare: calculatedTotal(),
    }
  } catch (error) {
    console.log(error)
  }
})
