<script lang="ts" setup>
import { Rates, Surcharges } from '~/composables/useRateCalculator'
import { DirectionsResponse } from '~~/types/DirectionsResponse'
import { Ref } from 'vue'
import Vue3QTelInput from 'vue3-q-tel-input'
import { formSchema, ValidationSchema } from '~/schema/quoteFormValues'
import { generateMock } from '@anatine/zod-mock'
import { date } from 'quasar'

//write a function that returns a date and time that is 2 hours from now and it formatted to a string
const getTwoHoursFromNow = () => {
  const now = new Date()
  const twoHoursFromNow = new Date(now.getTime() + 2 * 60 * 60 * 1000)
  return date.formatDate(twoHoursFromNow, 'YYYY-MM-DDTHH:mm')
}

//write a function that returns todays date formatted to a string YYYY-MM-DD
const getTodaysDate = () => {
  const now = new Date()
  return date.formatDate(now, 'YYYY-MM-DD')
}

const mockData = generateMock(formSchema)
console.log(mockData)

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

//data for Google Maps autocomplete from the maps store
// const mapStore = useMapStore()
// const {
//   distance_traveled,
//   duration_traveled,
//   origin_place_name,
//   destination_place_name,
//   vehicle_image,
//   service_type,
//   vehicle_type,
//   number_of_hours,
//   base_rate,
//   fuel_surcharge,
//   gratuity_rate,
//   hst,
//   total_cost,
// } = storeToRefs(mapStore)

//variables to show or hide the date and time popups
const showTimePopup = ref(false)
const showDatePopup = ref(false)

//logic to determine if it's an hourly based or distance based quote

// const loading = ref(false) as Ref<boolean>
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

// console.log(formBody)
// console.log(evt)

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
const firstName = ref<string>('')
const lastName = ref<string>('')
const emailAddress = ref<string>('')
const phoneNumber = ref<string>('')
const isRoundTrip = ref<boolean>(false)
const placeDataOrigin = ref<Place | null>(null)
const placeDataDestination = ref<Place | null>(null)
const isItHourly = ref(false) as Ref<boolean>
const tripData = ref<DirectionsResponse | null>(null)
const returnPickupDate = ref<string>('')
const returnPickupTime = ref<string>('')

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
  console.log('Is it a Roundtrip?', isRoundTrip.value)
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
const onReset = () => ref(null)
const quoteForm = ref(null)
const submitting = ref(false)
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
  })
  console.log('form data is:', formData)
  const form = formSchema.safeParse(formData)
  if (!form.success) {
    console.log('error', form.error)
    return (submitting.value = false)
  } else {
    console.log('success', form.data)
    const { data, error } = await useFetch('/api/submission', {
      method: 'POST',
      body: form.data,
    })
    ;(submitting.value = false), console.log('data is', data.value)
    return {
      data,
      error,
    }
  }
}
</script>

<template>
  <QForm
    class="max-w-2xl rounded-md shadow-xl bg-black p-5 space-y-3"
    ref="quoteForm"
    id="lead_form"
  >
    <QCardSection>
      <div class="text-white text-center uppercase text-3xl">Instant Quote</div>
    </QCardSection>
    <QCardSection horizontal class="grid grid-cols-1 gap-3">
      <InputPlacesAutocomplete
        name="originLocation"
        v-model="originLocation"
        label="Pick Up Location:"
        class="fit"
        @change="onOriginChange"
        placeholder="Enter pick up location"
      />
    </QCardSection>
    <QCardSection horizontal class="grid grid-cols-1 gap-3">
      <InputPlacesAutocomplete
        name="destinationLocation"
        v-model="destinationLocation"
        label="Drop Off Location:"
        class="fit"
        @change="onDestinationChange"
        placeholder="Enter drop off location"
      />
    </QCardSection>
    <QCardSection horizontal class="grid grid-cols-1 md:grid-cols-2 gap-3">
      <QCardSection horizontal class="col-span-1">
        <QInput
          hide-bottom-space
          v-model="pickupDate"
          outlined
          dense
          stack-label
          label="Pick Up Date:"
          bg-color="white"
          lazy-rules="ondemand"
          name="pickupDate"
          placeholder="Enter pick up date"
          class="fit"
        >
          <template v-slot:append>
            <QIcon name="event" class="cursor-pointer">
              <QPopupProxy
                cover
                transition-show="scale"
                transition-hide="scale"
                v-model="showDatePopup"
              >
                <QDate
                  name="pickup_date"
                  id="pickup_date"
                  v-model="pickupDate"
                  mask="YYYY-MM-DD"
                  ref="datePicker"
                >
                  <div class="items-center justify-end row">
                    <q-btn v-close-popup label="Close" color="brand" flat />
                  </div>
                </QDate>
              </QPopupProxy>
            </QIcon>
          </template>
        </QInput>
      </QCardSection>
      <QCardSection horizontal class="col-span-1">
        <QInput
          hide-bottom-space
          v-model="pickupTime"
          mask="time"
          :rules="['time']"
          label="Pickup Time:"
          lazy-rules="ondemand"
          dense
          outlined
          name="pickupTime"
          stack-label
          bg-color="white"
          class="fit"
          placeholder="Enter pick up time"
        >
          <template v-slot:append>
            <QIcon name="access_time" class="cursor-pointer">
              <QPopupProxy
                v-model="showTimePopup"
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <QTime
                  v-model="pickupTime"
                  name="pickupTime"
                  id="pickup_date"
                  required
                  :rules="['time']"
                  mask="HH:mm"
                >
                  <div class="items-center justify-end row">
                    <q-btn v-close-popup label="Close" color="brand" flat />
                  </div>
                </QTime>
              </QPopupProxy>
            </QIcon>
          </template>
        </QInput>
      </QCardSection>
    </QCardSection>
    <QCardSection
      v-if="isRoundTrip"
      horizontal
      class="grid grid-cols-1 md:grid-cols-2 gap-3"
    >
      <QCardSection horizontal class="col-span-1">
        <QInput
          hide-bottom-space
          v-model="returnPickupDate"
          outlined
          dense
          stack-label
          label="Return Pick Up Date:"
          bg-color="white"
          lazy-rules="ondemand"
          name="pickupDate"
          placeholder="Return pick up date"
          class="fit"
        >
          <template v-slot:append>
            <QIcon name="event" class="cursor-pointer">
              <QPopupProxy
                cover
                transition-show="scale"
                transition-hide="scale"
                v-model="showDatePopup"
              >
                <QDate
                  name="pickup_date"
                  id="pickup_date"
                  v-model="returnPickupDate"
                  mask="YYYY-MM-DD"
                  ref="datePicker"
                >
                  <div class="items-center justify-end row">
                    <q-btn v-close-popup label="Close" color="brand" flat />
                  </div>
                </QDate>
              </QPopupProxy>
            </QIcon>
          </template>
        </QInput>
      </QCardSection>
      <QCardSection horizontal class="col-span-1">
        <QInput
          hide-bottom-space
          v-model="returnPickupTime"
          mask="time"
          :rules="['time']"
          label="Return Pickup Time:"
          lazy-rules="ondemand"
          dense
          outlined
          name="pickupTime"
          stack-label
          bg-color="white"
          class="fit"
          placeholder="Return pick up time"
        >
          <template v-slot:append>
            <QIcon name="access_time" class="cursor-pointer">
              <QPopupProxy
                v-model="showTimePopup"
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <QTime
                  v-model="returnPickupTime"
                  name="pickupTime"
                  id="pickup_date"
                  required
                  :rules="['time']"
                  mask="HH:mm"
                >
                  <div class="items-center justify-end row">
                    <q-btn v-close-popup label="Close" color="brand" flat />
                  </div>
                </QTime>
              </QPopupProxy>
            </QIcon>
          </template>
        </QInput>
      </QCardSection>
    </QCardSection>
    <QCardSection horizontal class="grid grid-cols-1 md:grid-cols-2 gap-3">
      <QCardSection horizontal class="col-span-1">
        <QSelect
          hide-bottom-space
          v-model="selectedServiceType"
          for="service-type"
          id="service-type"
          name="selectedServiceType"
          dense
          label="Service Type:"
          stack-label
          outlined
          :options="serviceTypeOptions"
          bg-color="white"
          lazy-rules
          :rules="[(val: any) => !!val || '* Required']"
          class="fit"
          transition-duration="150"
        />
      </QCardSection>

      <QCardSection horizontal class="col-span-1">
        <QSelect
          hide-bottom-space
          label="Passengers:"
          name="selectedPassengers"
          id="num_passengers"
          dense
          outlined
          stack-label
          v-model="selectedPassengers"
          :options="passengerOptions"
          bg-color="white"
          lazy-rules
          :rules="[(val: any) => !!val || '* Required']"
          class="fit"
          transition-duration="150"
        />
      </QCardSection>
    </QCardSection>
    <QCardSection horizontal class="grid grid-cols-1 md:grid-cols-2 gap-3">
      <QCardSection horizontal class="col-span-1">
        <QSelect
          hide-bottom-space
          v-model="selectedVehicleType"
          label="Vehicle Type"
          :options="vehicleTypeOptions"
          dense
          name="selectedVehicleType"
          outlined
          stack-label
          bg-color="white"
          lazy-rules="ondemand"
          :rules="[(val: any) => !!val || '* Required']"
          class="fit"
          transition-duration="150"
        />
      </QCardSection>

      <QCardSection horizontal class="col-span-1">
        <QSelect
          hide-bottom-space
          name="selectedNumberOfHours"
          id="num_hours"
          label="Number Of Hours:"
          v-model="selectedNumberOfHours"
          :options="hoursRequiredOptions"
          outlined
          dense
          stack-label
          :disable="isDisabled"
          bg-color="white"
          lazy-rules="ondemand"
          :rules="[(val: any) => !!val || '* Required']"
          class="fit"
          transition-duration="150"
        />
      </QCardSection>
    </QCardSection>
    <QCardSection horizontal class="grid grid-cols-1 md:grid-cols-2 gap-3">
      <QCardSection horizontal class="col-span-1">
        <QInput
          hide-bottom-space
          type="text"
          name="firstName"
          id="first_name"
          v-model="firstName"
          label="First Name:"
          outlined
          dense
          stack-label
          lazy-rules
          bg-color="white"
          :rules="[(val: any) => !!val || '* Required']"
          class="fit"
          placeholder="Enter first name"
        />
      </QCardSection>

      <QCardSection horizontal class="col-span-1">
        <QInput
          hide-bottom-space
          type="text"
          name="lastName"
          id="last_name"
          label="Last Name:"
          dense
          outlined
          stack-label
          v-model="lastName"
          lazy-rules
          :rules="[(val: any) => !!val || '* Required']"
          bg-color="white"
          class="fit"
          placeholder="Enter last name"
        />
      </QCardSection>
    </QCardSection>
    <QCardSection horizontal class="grid grid-cols-1 md:grid-cols-2 gap-3">
      <QCardSection horizontal class="col-span-1">
        <QInput
          hide-bottom-space
          type="email"
          name="emailAddress"
          id="email"
          label="Email Address:"
          v-model="emailAddress"
          dense
          outlined
          stack-label
          lazy-rules
          :rules="['email']"
          bg-color="white"
          required
          :autocomplete="false"
          class="fit"
          placeholder="Enter email address"
        />
      </QCardSection>

      <QCardSection horizontal class="col-span-1">
        <ClientOnly>
          <Vue3QTelInput
            v-model:tel="phoneNumber"
            dense
            outlined
            stack-label
            lazy-rules
            bg-color="white"
            label="Phone Number:"
            name="phoneNumber"
            id="phoneNumber"
            input-mask="phone"
            :required="false"
            class="fit"
            placeholder="Enter phone number"
            hide-bottom-space
          />
        </ClientOnly>
      </QCardSection>
    </QCardSection>
    <QCardSection horizontal class="row">
      <QCheckbox
        name="isRoundTrip"
        id="round_trip"
        label="Round Trip"
        v-model="isRoundTrip"
        color="brand"
        dense
        class="text-white"
        hide-bottom-space
      />
      <QBtn v-show="false" label="reset" color="primary"></QBtn>
    </QCardSection>
    <QCardSection horizontal class="row">
      <QBtn
        id="submit_button"
        label="Get Prices &amp; Availability"
        color="red-8"
        class="full-width"
        @click="submitForm"
        :loading="submitting"
      />
    </QCardSection>
  </QForm>
</template>

<!--suppress CssMissingComma -->
<style>
#round_trip
  > div.q-checkbox__inner.relative-position.non-selectable.q-checkbox__inner--falsy
  > div {
  background-color: white;
}

#lead_form
  > div:nth-child(8)
  > div:nth-child(2)
  > label
  > div
  > div.q-field__control.relative-position.row.no-wrap.bg-white
  > div.q-field__prepend.q-field__marginal.row.no-wrap.items-center
  > label
  > div
  > div
  > div
  > div {
  padding-top: 5px !important;
}

#lead_form
  > div:nth-child(8)
  > div:nth-child(2)
  > label
  > div
  > div.q-field__control.relative-position.row.no-wrap.bg-white {
  padding: 0;
}

#lead_form
  > div:nth-child(8)
  > div:nth-child(2)
  > label
  > div
  > div.q-field__control.relative-position.row.no-wrap.bg-white
  > div.q-field__prepend.q-field__marginal.row.no-wrap.items-center
  > label
  > div
  > div
  > div
  > div {
  padding-left: 8px;
  padding-right: 6px;
  background: gray;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}

.quasar-form {
  max-width: 600px;
  background: black;
  border-radius: 4px;
}
</style>
