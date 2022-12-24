<script lang="ts" setup>
import { DirectionsResponse } from '~/types/DirectionsResponse'
import { Ref } from 'vue'
import { formSchema, ValidationSchema } from '~/schema/quoteFormValues'
import { useQuoteStore } from '~/stores/useQuoteStore'
import { storeToRefs } from 'pinia'

const quoteStore = useQuoteStore()
const { quoteFormValues } = storeToRefs(quoteStore)

// import { UAParser } from 'ua-parser-js'

// const parser = ref(new UAParser())
// const result = parser.value.getResult()
// const { ua, browser, device, os, cpu, engine } = result
// console.log(ua, browser, device, os, cpu, engine)

const passengerOptions = <SelectFormData[]>[
  {
    label: '1 passenger',
    value: 1,
  },
  {
    label: '2 passengers',
    value: 2,
  },
  {
    label: '3 passengers',
    value: 3,
  },
  {
    label: '4 passengers',
    value: 4,
  },
  {
    label: '5 passengers',
    value: 5,
  },
  {
    label: '6 passengers',
    value: 6,
  },
  {
    label: '7 passengers',
    value: 7,
  },
]
const selectedPassengers = ref<SelectFormData>({
  label: 'Select Passengers',
  value: 0,
})
console.log(selectedPassengers.value)

const serviceTypeOptions = <SelectFormData[]>[
  {
    label: 'Point-to-Point',
    value: 1,
  },
  {
    label: 'To Airport',
    value: 2,
  },
  {
    label: 'From Airport',
    value: 3,
  },
  {
    label: 'Hourly/As Directed',
    value: 4,
  },
]
const selectedServiceType = ref<SelectFormData>({
  label: 'Select Service Type',
  value: 0,
})
console.log(selectedServiceType.value)

const vehicleTypeOptions = <SelectFormData[]>[
  {
    label: 'Standard Sedan',
    value: 1,
  },
  {
    label: 'Premium Sedan',
    value: 2,
  },
  {
    label: 'Standard SUV',
    value: 3,
  },
  {
    label: 'Premium SUV',
    value: 4,
  },
]
const selectedVehicleType = ref<SelectFormData>({
  label: 'Select Vehicle Type',
  value: 0,
})
console.log(selectedVehicleType.value)

const hoursRequiredOptions = <SelectFormData[]>[
  {
    label: '2 hrs',
    value: 2,
  },
  {
    label: '3 hrs',
    value: 3,
  },
  {
    label: '4 hrs',
    value: 4,
  },
  {
    label: '5 hrs',
    value: 5,
  },
  {
    label: '6 hrs',
    value: 6,
  },
  {
    label: '7 hrs',
    value: 7,
  },
  {
    label: '8 hrs',
    value: 8,
  },
  {
    label: '9 hrs',
    value: 9,
  },
  {
    label: '10 hrs',
    value: 10,
  },
  {
    label: '11 hrs',
    value: 11,
  },
  {
    label: '12 hrs',
    value: 12,
  },
]
const selectedNumberOfHours = ref<SelectFormData>({
  label: 'For Hourly Service',
  value: 0,
})
console.log(selectedNumberOfHours.value)

//logic to determine if it's an hourly based or distance based quote

// const onSubmit = async (evt: Event) => {
//   loading.value = true
//   const rates = (await $fetch('/api/rates')) as Rates[]
//   const surcharges = (await $fetch('/api/surcharges')) as Surcharges
//   console.log(selectedVehicleType.value)
//   vehicle_type.value = selectedVehicleType.value
//   number_of_hours.value = selectedNumberOfHours.value as unknown as FormOptions
//   console.log(isItHourly.value)
//   const serviceRate = getRateFromId(selectedVehicleType.value.value, rates)
//   console.log(serviceRate)
//   const baseRate = getBaseRate(
//     isItHourly.value,
//     selectedNumberOfHours.value,
//     distance_traveled.value,
//     serviceRate as Rates,
//   ) as number
//   console.log(baseRate)
//   const { fuelSurcharge, gratuity, HST } = getSurchargeAmounts(
//     baseRate,
//     surcharges,
//   )
//   const sumOfSurcharges = ref<number>(baseRate + fuelSurcharge + gratuity + HST)
//   total_cost.value = usePrecision(
//     sumOfSurcharges,
//     2,
//   ) as unknown as number

//   console.log(total_cost.value)
//   //make total cost have 2 decimal places

//   //add the separated rate data to the quote store
//   base_rate.value = baseRate
//   fuel_surcharge.value = fuelSurcharge
//   gratuity_rate.value = gratuity
//   hst.value = HST

//   const vehicleImages = () => {
//     if (selectedVehicleType.value.label === 'Standard Sedan') {
//       return 'https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/8c7c6a8d-06ad-4278-1c70-9d497b1cb200/1024'
//     } else if (selectedVehicleType.value.label === 'Premium Sedan') {
//       return 'https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/5d171f30-de2f-447c-a602-95ccf248c600/1024'
//     } else if (selectedVehicleType.value.label === 'Standard SUV') {
//       return 'https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/b4bf6461-ba55-48bd-e0ba-d613ae383000/1024'
//     } else {
//       return 'https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/5d80107f-4800-45ae-8e20-c4adf2792f00/1024'
//     }
//   }
//   vehicle_image.value = vehicleImages()
//   console.log(vehicle_image.value)
//   const timestamp = evt.timeStamp
//   const {
//     origin_input,
//     destination_input,
//     pickup_date,
//     pickup_time,
//     num_passengers,
//     first_name,
//     last_name,
//     email_address,
//     phone_number,
//     /* @ts-ignore */
//   } = Object.fromEntries(new FormData(evt.target as HTMLFormElement))

// const service_type_id = ref(service_type.value.value) as Ref<number>
// const formBody = {
//   fields: [
//     {
//       objectTypeId: '0-1',
//       name: 'pick_up_date',
//       value: pickup_date,
//     },
//     {
//       objectTypeId: '0-1',
//       name: 'pick_up_time',
//       value: pickup_time,
//     },
//     {
//       objectTypeId: '0-1',
//       name: 'vehicle_type',
//       value: selectedVehicleType.value.label,
//     },
//     {
//       objectTypeId: '0-1',
//       name: 'origin_formatted_address',
//       value: origin_input,
//     },
//     {
//       objectTypeId: '0-1',
//       name: 'destination_formatted_address',
//       value: destination_input,
//     },
//     {
//       objectTypeId: '0-1',
//       name: 'firstname',
//       value: first_name,
//     },
//     {
//       objectTypeId: '0-1',
//       name: 'lastname',
//       value: last_name,
//     },
//     {
//       objectTypeId: '0-1',
//       name: 'email',
//       value: email_address,
//     },
//     {
//       objectTypeId: '0-1',
//       name: 'phone',
//       value: phone_number,
//     },
//     {
//       objectTypeId: '0-1',
//       name: 'service_type',
//       value: service_type.value.label,
//     },
//     {
//       objectTypeId: '0-1',
//       name: 'service_type_id',
//       value: service_type_id.value,
//     },
//     {
//       objectTypeId: '0-1',
//       name: 'deal_amount',
//       value: total_cost.value,
//     },
//     {
//       objectTypeId: '0-1',
//       name: 'pax_amount',
//       value: num_passengers,
//     },
//     {
//       objectTypeId: '0-1',
//       name: 'hours',
//       value: selectedNumberOfHours.value,
//     },
//     {
//       objectTypeId: '0-1',
//       name: 'distance',
//       value: distance_traveled.value,
//     },
//     {
//       objectTypeId: '0-1',
//       name: 'time',
//       value: duration_traveled.value,
//     },
//     {
//       objectTypeId: '0-1',
//       name: 'submission_timestamp',
//       value: timestamp,
//     },
//     {
//       objectTypeId: '0-1',
//       name: 'vehicle_image_url',
//       value: vehicle_image.value,
//     },
//     {
//       objectTypeId: '0-1',
//       name: 'destination_place_name',
//       value: destination_place_name.value,
//     },
//     {
//       objectTypeId: '0-1',
//       name: 'origin_place_name',
//       value: origin_place_name.value,
//     },
//   ],
// }

// const { data, error } = await useFetch('/api/formSubmit', {
//   body: formBody,
// })
// const router = useRouter()
// setTimeout(() => {
//   router.push('/quoted')
// }, 750)
// loading.value = false

// return {
//   data,
//   error,
// }
// }

interface Place {
  place_id: string
  formatted_address: string
  name: string
}

interface SelectFormData {
  label: string
  value: number
}

const originLocation = ref<string>('')
const destinationLocation = ref<string>('')
const origin = ref<Place | null>(null)
const destination = ref<Place | null>(null)
const originPlaceId = ref<string>('')
const destinationPlaceId = ref<string>('')
const pickupDate = ref<string>('')
const pickupTime = ref<string>('')
const returnPickupDate = ref<string>('')
const returnPickupTime = ref<string>('')
const firstName = ref<string>('')
const lastName = ref<string>('')
const emailAddress = ref<string>('')
const phoneNumber = ref<string>('')
const isRoundTrip = ref<boolean>(false)
const placeDataOrigin = ref<Place | null>(null)
const placeDataDestination = ref<Place | null>(null)
const isItHourly = ref(false) as Ref<boolean>
const tripData = ref<DirectionsResponse | null>(null)
const calculatedDistance = ref<number>(0)

const checkValues = () => {
  console.log('Pickup Date:', pickupDate.value)
  console.log('Pickup Time:', pickupTime.value)
  console.log('Service Type:', selectedServiceType.value)
  console.log('Vehicle Type:', selectedVehicleType.value)
  console.log('Number of Hours:', selectedNumberOfHours.value)
  console.log('Number of Passengers:', selectedPassengers.value)
  console.log('First Name:', firstName.value)
  console.log('Last Name:', lastName.value)
  console.log('Email Address:', emailAddress.value)
  console.log('Phone Number:', phoneNumber.value)
  console.log('Is it a Round-trip?', isRoundTrip.value)
  console.log('Is it hourly?', isItHourly.value)
  console.log('Trip Data:', tripData.value)
  console.log('Origin Data:', placeDataOrigin.value)
  console.log('Destination Data:', placeDataDestination.value)
}

const isDisabled = ref(true)
watch(selectedServiceType, () => {
  if (selectedServiceType.value.value === 4) {
    isItHourly.value = true
    isDisabled.value = false
    selectedNumberOfHours.value = { label: 'Select Hours', value: 0 }
  } else {
    isItHourly.value = false
    isDisabled.value = true
    selectedNumberOfHours.value = { label: 'For Hourly Service', value: 0 }
  }
  console.log(
    selectedServiceType.value.label as string,
    selectedServiceType.value.value,
    selectedNumberOfHours.value,
    isItHourly.value
  )
})

const onOriginChange = async (e: Place) => {
  origin.value = e
  console.log('Origin:', origin.value)
  if (origin.value && destination.value) {
    console.log('origin and destination are both set')
    const { place_id } = origin.value
    const { data } = await useFetch<DirectionsResponse>('/api/get-distance', {
      query: {
        origin: originPlaceId.value,
        destination: place_id,
      },
    })
    console.log('query', {
      origin: originPlaceId.value,
      destination: place_id,
    })
    console.log('data is', data.value)
    tripData.value = JSON.stringify(data.value) as unknown as DirectionsResponse
    placeDataOrigin.value = JSON.stringify(origin.value) as unknown as Place
    placeDataDestination.value = JSON.stringify(
      destination.value
    ) as unknown as Place
    console.log('Trip data:', tripData)
    console.log('Origin data:', placeDataOrigin.value)
    console.log('Destination data:', placeDataDestination.value)
    const {
      distanceText,
      distanceValue,
      durationText,
      durationValue,
      endLat,
      endLng,
      startLat,
      startLng,
    } = tripData.value as DirectionsResponse
    const {
      place_id: originPlaceIdValue,
      formatted_address: originFormattedAddress,
      name: originName,
    } = placeDataOrigin.value as Place
    const {
      place_id: destinationPlaceId,
      formatted_address: destinationFormattedAddress,
      name: destinationName,
    } = placeDataDestination.value as Place
    calculatedDistance.value = distanceValue / 1000
    console.log('calculated distance is:', calculatedDistance.value)
    return {
      distanceText,
      distanceValue,
      durationText,
      durationValue,
      endLat,
      endLng,
      startLat,
      startLng,
      originPlaceIdValue,
      originFormattedAddress,
      originName,
      destinationPlaceId,
      destinationFormattedAddress,
      destinationName,
      calculatedDistance,
    }
  } else {
    const { place_id } = origin.value
    console.log('only origin is set')
    console.log('place id is:', place_id)
    return (originPlaceId.value = place_id)
  }
}

const onDestinationChange = async (e: Place) => {
  destination.value = e
  console.log('Destination:', destination.value)
  if (origin.value && destination.value) {
    console.log('origin and destination are both set')
    const { place_id } = destination.value
    const { data } = await useFetch('/api/get-distance', {
      query: {
        origin: originPlaceId.value,
        destination: place_id,
      },
    })
    tripData.value = data.value
    placeDataOrigin.value = origin.value
    placeDataDestination.value = destination.value
    console.log('Trip data:', tripData.value)
    console.log('Origin data:', placeDataOrigin.value)
    console.log('Destination data:', placeDataDestination.value)
    const {
      distanceText,
      distanceValue,
      durationText,
      durationValue,
      endLat,
      endLng,
      startLat,
      startLng,
    } = tripData.value as DirectionsResponse
    const {
      place_id: originPlaceIdValue,
      formatted_address: originFormattedAddress,
      name: originName,
    } = placeDataOrigin.value as Place
    const {
      place_id: destinationPlaceId,
      formatted_address: destinationFormattedAddress,
      name: destinationName,
    } = placeDataDestination.value as Place
    calculatedDistance.value = distanceValue / 1000
    console.log('calculated distance is:', calculatedDistance.value)
    return {
      distanceText,
      distanceValue,
      durationText,
      durationValue,
      endLat,
      endLng,
      startLat,
      startLng,
      originPlaceIdValue,
      originFormattedAddress,
      originName,
      destinationPlaceId,
      destinationFormattedAddress,
      destinationName,
      tripData,
      calculatedDistance,
    }
  } else {
    console.log('only destination is set')
    const { place_id } = destination.value
    console.log('destination place id is:', place_id)
    return (destinationPlaceId.value = place_id)
  }
}

//todo: make the form reset without it having all of the inputs with errors
//todo: add logic to check if the user picked an airport, if true add extra to the cost
//todo: add waypoints to the route for the quote
//todo: add popup to show images of the vehicles
//todo: add popup to show the terms and conditions

const quoteForm = ref(null)
const submitting = ref(false)
const router = useRouter()

const submitForm = async () => {
  submitting.value = true
  const formData = reactive<ValidationSchema>({
    pickupDate: pickupDate.value,
    pickupTime: pickupTime.value,
    serviceType: selectedServiceType.value,
    vehicleType: selectedVehicleType.value,
    numberOfHours: selectedNumberOfHours.value,
    passengers: selectedPassengers.value,
    firstName: firstName.value,
    lastName: lastName.value,
    emailAddress: emailAddress.value,
    phoneNumber: phoneNumber.value,
    isRoundTrip: isRoundTrip.value,
    isHourly: isItHourly.value,
    tripData: tripData.value as unknown as DirectionsResponse,
    originData: placeDataOrigin.value as unknown as Place,
    destinationData: placeDataDestination.value as unknown as Place,
    calculatedDistance: calculatedDistance.value,
  })
  console.log('form data is:', formData)
  const form = formSchema.safeParse(formData)
  if (!form.success) {
    console.log('error', form.error)
    return (submitting.value = false)
  } else {
    console.log('success', form.data)
    quoteFormValues.value = form.data
    console.log('quote form values are:', quoteFormValues.value)
    const { data, error } = await useFetch('/api/submission', {
      method: 'POST',
      body: form.data,
    })
    setTimeout(() => {
      router.push('/quoted')
    }, 1550)
    submitting.value = false
    return {
      data: data.value,
      error: error.value,
    }
  }
}
</script>

<template>
  <form
    class="max-w-2xl rounded-lg shadow-xl bg-black p-5 space-y-3 border border-white"
    ref="quoteForm"
    id="lead_form"
  >
    <div>
      <div class="text-white text-center uppercase text-3xl">Instant Quote</div>
    </div>
    <div class="grid w-full grid-cols-1 gap-3">
      <InputPlacesAutocomplete
        name="originLocation"
        v-model="originLocation"
        label="Pick Up Location:"
        class="fit"
        @change="onOriginChange"
        placeholder="Enter pick up location"
      />
    </div>
    <div class="grid w-full grid-cols-1 gap-3">
      <InputPlacesAutocomplete
        name="destinationLocation"
        v-model="destinationLocation"
        label="Drop Off Location:"
        class="fit"
        @change="onDestinationChange"
        placeholder="Enter drop off location"
      />
    </div>
    <div class="grid w-full grid-cols-1 gap-3 md:grid-cols-2">
      <div class="col-span-1">
        <InputDate placeholder="Enter A Pickup Date" />
      </div>
      <div class="md:col-span-1">
        <InputDate placeholder="Enter A Pickup Time" />
      </div>
    </div>
    <div v-if="isRoundTrip" class="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div class="col-span-1">
        <InputDate placeholder="Enter A Return Date" />
      </div>
      <div class="col-span-1">
        <InputDate placeholder="Enter A Return Date" />
      </div>
    </div>
    <div class="grid w-full grid-cols-1 gap-3 md:grid-cols-2">
      <div class="col-span-1">
        <InputSelect
          v-model="selectedServiceType"
          label="Service Type:"
          id="service-type"
          name="selectedServiceType"
          :options="serviceTypeOptions"
          :disable="isDisabled"
        />
      </div>

      <div class="col-span-1">
        <InputSelect
          label="Passengers:"
          name="selectedPassengers"
          id="num_passengers"
          v-model="selectedPassengers"
          :options="passengerOptions"
          :disable="isDisabled"
        />
      </div>
    </div>
    <div class="grid w-full grid-cols-1 gap-3 md:grid-cols-2">
      <div class="col-span-1">
        <InputSelect
          name="selectedVehicleType"
          id="selectedVehicleType"
          v-model="selectedVehicleType"
          label="Vehicle Type"
          :options="vehicleTypeOptions"
          :disable="isDisabled"
        />
      </div>

      <div class="col-span-1">
        <InputSelect
          name="selectedNumberOfHours"
          id="num_hours"
          label="Number Of Hours:"
          v-model="selectedNumberOfHours"
          :options="hoursRequiredOptions"
          :disable="isDisabled"
        />
      </div>
    </div>
    <div class="grid w-full grid-cols-1 gap-3 md:grid-cols-2">
      <div class="col-span-1">
        <InputText
          type="text"
          name="firstName"
          id="first_name"
          v-model="firstName"
          label="First Name:"
          placeholder="Enter first name"
        />
      </div>

      <div class="col-span-1">
        <InputText
          type="text"
          name="lastName"
          id="last_name"
          label="Last Name:"
          v-model="lastName"
          placeholder="Enter last name"
        />
      </div>
    </div>
    <div class="grid w-full grid-cols-1 gap-3 md:grid-cols-2">
      <div class="col-span-1">
        <InputText
          type="email"
          name="emailAddress"
          id="email"
          label="Email Address:"
          v-model="emailAddress"
          placeholder="Enter Email Address"
        />
      </div>

      <div class="col-span-1">
        <InputText
          type="tel"
          name="phoneNumber"
          id="phone"
          label="Phone Number:"
          v-model="phoneNumber"
          placeholder="Enter Phone Number"
        />
      </div>
    </div>
    <div class="flex flex-row">
      <InputCheckbox
        name="isRoundTrip"
        id="round_trip"
        label="Round Trip"
        v-model="isRoundTrip"
      />
    </div>
    <div class="flex flex-row">
      <button
        @click="submitForm"
        id="submit_button"
        type="submit"
        class="inline-flex w-full uppercase items-center rounded border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
      >
        <span class="self-center mx-auto">Get Prices & Availability</span>
      </button>
    </div>
  </form>
</template>
