import { ValidationSchema } from '~/schema/quoteFormValues'
import { VehicleType } from '~/schema/vehicleType'
import { TripData } from '~/types/data'
import { Place } from '~/types/DirectionsResponse'
import { Surcharges } from '~/schema/surcharges'
import { serverSupabaseClient } from '#supabase/server'
import { Database } from '~/types/supabase'
import { ref } from 'vue'

export default defineEventHandler(async (event) => {
  const zapierSecret = useRuntimeConfig().ZAPIER_WEBHOOK_SECRET
  const supabase = serverSupabaseClient<Database>(event)
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

    const {
      formatted_address: originFormattedAddress,
      name: originName,
      place_id: originPlaceId,
      isPearsonAirportOrigin,
    } = placeDataOrigin as Place

    const {
      formatted_address: destinationFormattedAddress,
      name: destinationName,
      place_id: destinationPlaceId,
      isPearsonAirportDestination,
    } = placeDataDestination as Place

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

    //get the vehicle type from the vehicle type value
    const getVehicleType = async () => {
      const { data } = await supabase
        .from('vehicle_type')
        .select('*')
        .eq('value', vehicleTypeValue)
      console.log('This is the Vehicle Type', data)
      return data
    }
    const vehicleRates = (await getVehicleType()) as VehicleType[]

    const {
      min_distance,
      min_rate_distance,
      per_km,
      min_hours_hourly,
      min_rate_hourly,
      per_hour,
    } = vehicleRates[0]

    //calculate the base rate
    const baseRateDistance = () => {
      if (calculatedDistance < min_distance) {
        return min_rate_distance
      }
      return (calculatedDistance - min_distance) * per_km + min_rate_distance
    }

    const baseRateHourly = () => {
      if (selectedHours < min_hours_hourly) {
        return min_rate_hourly
      }
      return selectedHours * per_hour
    }

    //get the surcharges
    const getSurcharges = async () => {
      const { data } = await supabase.from('surcharges').select()
      console.log('This is the Surcharge Data', data)
      return data
    }
    const surcharges = (await getSurcharges()) as Surcharges[]

    const baseAmount = () => {
      if (isItHourly) {
        return baseRateHourly()
      }
      return baseRateDistance()
    }
    const surchargeAmounts = {} as any
    let totalAmount: string | number = baseAmount()

    for (const surcharge of surcharges) {
      if (surcharge.is_active) {
        let amount = 0
        if (surcharge.is_percentage) {
          amount = baseAmount() * surcharge.amount
        } else if (surcharge.is_flat) {
          amount = surcharge.amount
        }
        if (surchargeAmounts[surcharge.name]) {
          surchargeAmounts[surcharge.name] += amount
        } else {
          surchargeAmounts[surcharge.name] = amount
        }
        totalAmount += amount
      }
    }

    const setPearsonAirportFee = () => {
      if (isRoundTrip) {
        if (
          placeDataOrigin.isPearsonAirportOrigin ||
          placeDataDestination.isPearsonAirportDestination
        ) {
          return 15
        }
      } else if (placeDataOrigin.isPearsonAirportOrigin) {
        return 15
      }
      return 0
    }

    const pearsonFee = ref(0)
    const roundTripAmount = () => {
      if (isRoundTrip) {
        pearsonFee.value = setPearsonAirportFee()
        // @ts-ignore
        return pearsonFee.value + totalAmount * 2
      } else {
        return totalAmount
      }
    }

    // convert values to strings with 2 decimal places
    for (const key in surchargeAmounts) {
      surchargeAmounts[key] = surchargeAmounts[key].toFixed(2)
    }
    totalAmount = totalAmount.toFixed(2)

    console.log(surchargeAmounts) // {surcharge1: "20.00", surcharge2: "10.00", tax: "10.00"}
    console.log(totalAmount) // "130.00"

    const hplUserId = ref('')
    // add a user to the database
    const addUser = async () => {
      const { data, error } = await supabase
        .from('user')
        .upsert(
          {
            firstName,
            lastName,
            emailAddress,
            phoneNumber,
          },
          { onConflict: 'emailAddress' }
        )
        .select()
      if (error) {
        console.log('Error', error)
      }
      console.log('This is the User Data', data)
      //@ts-ignore
      hplUserId.value = data[0].id
      console.log('This is the hplUserId', hplUserId.value)
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
      console.log('This is the latest quote number', data)
      return data as QuoteNumber
    }
    const { latest_quote_number } = await getQuoteNumber()

    //increment and update the latest quote number
    const incrementedQuoteNumber = async () => {
      const updatedQuoteNumber = latest_quote_number + 1
      const { data } = await supabase
        .from('quote_number')
        .update({ latest_quote_number: updatedQuoteNumber })
        .eq('id', '1')
      return updatedQuoteNumber
    }
    const quoteNumber = await incrementedQuoteNumber()
    console.log('This is the incremented quote number', quoteNumber)

    //add the quote to the database
    const addQuote = async () => {
      const { data, error } = await supabase
        .from('quotes')
        .upsert({
          pickupDate,
          pickupTime,
          isRoundTrip,
          returnDate,
          returnTime,
          originFormattedAddress: placeDataOrigin.formatted_address,
          originName: placeDataOrigin.name,
          originPlaceId: placeDataOrigin.place_id,
          isPearsonAirportPickup: isPearsonAirportOrigin,
          startLat: tripData.startLat,
          startLng: tripData.startLng,
          destinationFormattedAddress: placeDataDestination.formatted_address,
          destinationName: placeDataDestination.name,
          destinationPlaceId: placeDataDestination.place_id,
          isPearsonAirportDropoff: isPearsonAirportDestination,
          endLat: tripData.endLat,
          endLng: tripData.endLng,
          vehicleTypeLabel: selectedVehicleType.label,
          vehicleTypeValue: selectedVehicleType.value,
          serviceTypeLabel: selectedServiceType.label,
          serviceTypeValue: selectedServiceType.value,
          passengersLabel: selectedPassengers.label,
          passengersValue: selectedPassengers.value,
          isItHourly,
          hoursLabel: selectedHoursLabel,
          hoursValue: selectedHours,
          distanceText: tripData.distanceText,
          distanceValue: tripData.distanceValue,
          durationText: tripData.durationText,
          durationValue: tripData.durationValue,
          calculatedDistance,
          baseRate: isItHourly ? baseRateHourly() : baseRateDistance(),
          fuelSurcharge: surchargeAmounts['Fuel Surcharge'],
          gratuity: surchargeAmounts.Gratuity,
          HST: surchargeAmounts.HST,
          userEmail: emailAddress,
          totalFare: totalAmount as number,
          quote_number: quoteNumber,
          firstName,
          lastName,
          userId: hplUserId.value,
          roundTripTotal: roundTripAmount(),
          airportFee: setPearsonAirportFee(),
        })
        .select()
      if (error) {
        console.log('This is the returned error', error)
      }
      console.log('This is the returned quote data', data)
    }

    const sendEmail = async () => {
      const data = await $fetch(zapierSecret, {
        method: 'POST',
        body: {
          firstName,
          lastName,
          emailAddress,
          roundTripTotal: roundTripAmount(),
          totalFare: totalAmount as number,
          vehicleTypeLabel: selectedVehicleType.label,
          serviceTypeLabel: selectedServiceType.label,
          isItRoundTrip: isRoundTrip,
          destinationName: placeDataDestination.name,
          originName: placeDataOrigin.name,
          pickupDate,
          pickupTime,
          returnDate,
          returnTime,
          quoteNumber,
          originFormattedAddress: placeDataOrigin.formatted_address,
          destinationFormattedAddress: placeDataDestination.formatted_address,
        },
      })
      console.log('This is the returned email data', data)
    }
    await addUser()
    await addQuote()
    await sendEmail()

    return {
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
      hplUserId: hplUserId.value,
    }
  } catch (error) {
    console.log(error)
  }
})
