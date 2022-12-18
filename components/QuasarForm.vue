<script lang='ts' setup>
import { Rates, Surcharges } from '~/composables/useRateCalculator'
import { DirectionsResponse } from '~~/types/DirectionsResponse'
import { Ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useMapStore } from '~~/stores/useMapStore'
import Vue3QTelInput from 'vue3-q-tel-input'

// import { UAParser } from 'ua-parser-js'

// const parser = ref(new UAParser())
// const result = parser.value.getResult()
// const { ua, browser, device, os, cpu, engine } = result
// console.log(ua, browser, device, os, cpu, engine)

interface FormOptions {
  label: string
  value: number
}

const passengerOptions = [
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
const selectedPassengers = ref<{ label: string, value: number } | null>(null)


const serviceTypeOptions = [
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
const selectedServiceType = ref<{ label: string, value: number } | null>(null)


const vehicleTypeOptions = [
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
const selectedVehicleType = ref<{ label: string, value: string } | null>(null)

const hoursRequiredOptions = [
  {
    label: '2 hrs',
    value: '2',
  },
  {
    label: '3 hrs',
    value: '3',
  },
  {
    label: '4 hrs',
    value: '4',
  },
  {
    label: '5 hrs',
    value: '5',
  },
  {
    label: '6 hrs',
    value: '6',
  },
  {
    label: '7 hrs',
    value: '7',
  },
  {
    label: '8 hrs',
    value: '8',
  },
  {
    label: '9 hrs',
    value: '9',
  },
  {
    label: '10 hrs',
    value: '10',
  },
  {
    label: '11 hrs',
    value: '11',
  },
  {
    label: '12 hrs',
    value: '12',
  },
]
const selectedNumberOfHours = ref<{ label: string, value: string } | null>(null)

//data for Google Maps autocomplete from the maps store
const mapStore = useMapStore()
const {
  distance_traveled,
  duration_traveled,
  origin_place_name,
  destination_place_name,
  first_name,
  last_name,
  email_address,
  phone_number,
  vehicle_image,
  pickup_date,
  pickup_time,
  service_type,
  vehicle_type,
  number_of_hours,
  is_round_trip,
  base_rate,
  fuel_surcharge,
  gratuity_rate,
  hst,
  total_cost,
} = storeToRefs(mapStore)




//variables to show or hide the date and time popups
const showTimePopup = ref(false)
const showDatePopup = ref(false)

//logic to determine if it's an hourly based or distance based quote
const isItHourly = ref(false) as Ref<boolean>

watch(selectedServiceType, () => {
  if (selectedServiceType.value.value === 4) {
    isItHourly.value = true
    selectedNumberOfHours.value = { label: '2 hrs', value: '2' }
  } else {
    isItHourly.value = false
    selectedNumberOfHours.value = null
  }
  console.log(
    selectedServiceType.value.label,
    selectedServiceType.value.value,
    selectedNumberOfHours.value,
    isItHourly.value,
  )
})

const loading = ref(false) as Ref<boolean>
const onSubmit = async (evt: Event) => {
  loading.value = true
  const rates = (await $fetch('/api/rates')) as Rates[]
  const surcharges = (await $fetch('/api/surcharges')) as Surcharges
  console.log(selectedVehicleType.value)
  vehicle_type.value = selectedVehicleType.value
  number_of_hours.value = selectedNumberOfHours.value as unknown as FormOptions
  console.log(isItHourly.value)
  const serviceRate = getRateFromId(selectedVehicleType.value.value, rates)
  console.log(serviceRate)
  const baseRate = getBaseRate(
    isItHourly.value,
    selectedNumberOfHours.value,
    distance_traveled.value,
    serviceRate as Rates,
  ) as number
  console.log(baseRate)
  const { fuelSurcharge, gratuity, HST } = getSurchargeAmounts(
    baseRate,
    surcharges,
  )
  const sumOfSurcharges = ref(baseRate + fuelSurcharge + gratuity + HST)
  total_cost.value = usePrecision(
    sumOfSurcharges as unknown as number,
    2,
  ) as unknown as number

  console.log(total_cost.value)
  //make total cost have 2 decimal places

  //add the separated rate data to the quote store
  base_rate.value = baseRate
  fuel_surcharge.value = fuelSurcharge
  gratuity_rate.value = gratuity
  hst.value = HST

  const vehicleImages = () => {
    if (selectedVehicleType.value.label === 'Standard Sedan') {
      return 'https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/8c7c6a8d-06ad-4278-1c70-9d497b1cb200/1024'
    } else if (selectedVehicleType.value.label === 'Premium Sedan') {
      return 'https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/5d171f30-de2f-447c-a602-95ccf248c600/1024'
    } else if (selectedVehicleType.value.label === 'Standard SUV') {
      return 'https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/b4bf6461-ba55-48bd-e0ba-d613ae383000/1024'
    } else {
      return 'https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/5d80107f-4800-45ae-8e20-c4adf2792f00/1024'
    }
  }
  vehicle_image.value = vehicleImages()
  console.log(vehicle_image.value)
  const timestamp = evt.timeStamp
  const {
    origin_input,
    destination_input,
    pickup_date,
    pickup_time,
    num_passengers,
    first_name,
    last_name,
    email_address,
    phone_number,
    /* @ts-ignore */
  } = Object.fromEntries(new FormData(evt.target as HTMLFormElement))

  const service_type_id = ref(service_type.value.value) as Ref<number>
  const formBody = {
    fields: [
      {
        objectTypeId: '0-1',
        name: 'pick_up_date',
        value: pickup_date,
      },
      {
        objectTypeId: '0-1',
        name: 'pick_up_time',
        value: pickup_time,
      },
      {
        objectTypeId: '0-1',
        name: 'vehicle_type',
        value: selectedVehicleType.value.label,
      },
      {
        objectTypeId: '0-1',
        name: 'origin_formatted_address',
        value: origin_input,
      },
      {
        objectTypeId: '0-1',
        name: 'destination_formatted_address',
        value: destination_input,
      },
      {
        objectTypeId: '0-1',
        name: 'firstname',
        value: first_name,
      },
      {
        objectTypeId: '0-1',
        name: 'lastname',
        value: last_name,
      },
      {
        objectTypeId: '0-1',
        name: 'email',
        value: email_address,
      },
      {
        objectTypeId: '0-1',
        name: 'phone',
        value: phone_number,
      },
      {
        objectTypeId: '0-1',
        name: 'service_type',
        value: service_type.value.label,
      },
      {
        objectTypeId: '0-1',
        name: 'service_type_id',
        value: service_type_id.value,
      },
      {
        objectTypeId: '0-1',
        name: 'deal_amount',
        value: total_cost.value,
      },
      {
        objectTypeId: '0-1',
        name: 'pax_amount',
        value: num_passengers,
      },
      {
        objectTypeId: '0-1',
        name: 'hours',
        value: selectedNumberOfHours.value,
      },
      {
        objectTypeId: '0-1',
        name: 'distance',
        value: distance_traveled.value,
      },
      {
        objectTypeId: '0-1',
        name: 'time',
        value: duration_traveled.value,
      },
      {
        objectTypeId: '0-1',
        name: 'submission_timestamp',
        value: timestamp,
      },
      {
        objectTypeId: '0-1',
        name: 'vehicle_image_url',
        value: vehicle_image.value,
      },
      {
        objectTypeId: '0-1',
        name: 'destination_place_name',
        value: destination_place_name.value,
      },
      {
        objectTypeId: '0-1',
        name: 'origin_place_name',
        value: origin_place_name.value,
      },
    ],
  }

  console.log(formBody)
  console.log(evt)

  const { data, error } = await useFetch('/api/formSubmit', {
    body: formBody,
  })
  const router = useRouter()
  setTimeout(() => {
    router.push('/quoted')
  }, 750)
  loading.value = false

  return {
    data,
    error,
  }
}

interface Place {
  place_id: string
  formatted_address: string
  name: string
}


const originLocation = ref<string | undefined>(undefined)
const destinationLocation = ref<string | undefined>(undefined)
const origin = ref<Place | null>(null)
const destination = ref<Place | null>(null)
const originPlaceId = ref<string | undefined>(undefined)
const destinationPlaceId = ref<string | undefined>(undefined)
const pickupDate = ref<string | undefined>(undefined)
const pickupTime = ref<string | undefined>(undefined)
const firstName = ref<string | undefined>(undefined)
const lastName = ref<string | undefined>(undefined)
const emailAddress = ref<string | undefined>(undefined)
const phoneNumber = ref<string | undefined>(undefined)
const isRoundTrip = ref<boolean>(false)
const tripData = ref<DirectionsResponse | null>(null)
const placeDataOrigin = ref<Place | null>(null)
const placeDataDestination = ref<Place | null>(null)


const checkValues = () => {
  console.log('Pickup Date:',pickupDate.value)
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

const onOriginChange = async (e: Place) => {
  origin.value = e
  console.log('Origin:', origin.value)
  if (origin.value && destination.value) {
    console.log('origin and destination are both set')
    const { place_id, formatted_address, name } = origin.value
    const { data } = await useFetch<DirectionsResponse>('/api/get-distance', {
      query: {
        origin: originPlaceId.value,
        destination: place_id,
      },
    })
    console.log('data is', data.value)
    tripData.value = data.value
    placeDataOrigin.value = origin.value
    placeDataDestination.value = destination.value
    const { distanceText, distanceValue, durationText, durationValue, endLat, endLng, startLat, startLng } = tripData.value as DirectionsResponse
    return {
      distanceText,
      distanceValue,
      durationText,
      durationValue,
      endLat,
      endLng,
      startLat,
      startLng,
      place_id,
      formatted_address,
      name
    }
  }
  else {
    const { place_id } = origin.value
    console.log('only origin is set')
    console.log('place id is', place_id)
    return originPlaceId.value = place_id
  }
}

const onDestinationChange = async (e: Place) => {
  destination.value = e
  console.log('Destination:', destination.value)
  if (origin.value && destination.value) {
    console.log('origin and destination are both set')
    const { place_id, formatted_address, name } = destination.value
    const { data } = await useFetch('/api/get-distance', {
      query: {
        origin: originPlaceId.value,
        destination: place_id,
      },
    })
    tripData.value = data.value
    placeDataOrigin.value = origin.value
    placeDataDestination.value = destination.value
    const { distanceText, distanceValue, durationText, durationValue, endLat, endLng, startLat, startLng } = data.value as DirectionsResponse
    return {
      distanceText,
      distanceValue,
      durationText,
      durationValue,
      endLat,
      endLng,
      startLat,
      startLng,
      place_id,
      formatted_address,
      name
    }
  } else {
    console.log('only destination is set')
    const { place_id } = destination.value
    console.log('destination place id is', place_id)
    return destinationPlaceId.value = place_id
  }
}

//todo: make the form reset without it having all of the inputs with errors
//todo: add logic to check if the user picked an airport, if true add extra to the cost
//todo: add waypoints to the route for the quote
//todo: add popup to show images of the vehicles
//todo: add popup to show the terms and conditions
const onReset = () => ref(null)

</script>

<template>
  <QForm
    rounded-borders
    no-error-focus
    no-reset-focus
    @submit.prevent='onSubmit'
    @reset='onReset'
    id='lead_form'
    ref='myForm'
    class='mx-auto overflow-hidden bg-black quasar-form q-pa-sm'
    autocomplete='off'
  >
    <QCardSection>
      <div class='text-center text-white text-uppercase text-h5'>Instant Quote</div>
    </QCardSection>
    <QCardSection horizontal class='q-pa-sm'>
      <InputPlacesAutocomplete
        name='origin_input_1'
        v-model='originLocation'
        label='Pick Up Location:'
        class='full-width'
        @change='onOriginChange'
      />
    </QCardSection>
    <QCardSection horizontal class='q-pa-sm'>
      <InputPlacesAutocomplete
        name='origin_input_1'
        v-model='destinationLocation'
        label='Drop Off Location:'
        class='full-width'
        @change='onDestinationChange'
      />
    </QCardSection>
    <QCardSection horizontal class='row q-pa-sm q-gutter-sm'>
      <QCardSection horizontal class='col'>
        <QInput
          hide-bottom-space
          v-model='pickupDate'
          :rules="['date']"
          outlined
          dense
          stack-label
          label='Pick Up Date:'
          bg-color='white'
          lazy-rules='ondemand'
          name='pickup_date'
          required
          class='full-width'
        >
          <template v-slot:append>
            <QIcon name='event' class='cursor-pointer'>
              <QPopupProxy
                cover
                transition-show='scale'
                transition-hide='scale'
                v-model='showDatePopup'
              >
                <QDate
                  name='pickup_date'
                  id='pickup_date'
                  v-model='pickupDate'
                  required
                  :rules="['date']"
                  mask='YYYY-MM-DD'
                >
                  <div class='items-center justify-end row'>
                    <q-btn v-close-popup label='Close' color='brand' flat />
                  </div>
                </QDate>
              </QPopupProxy>
            </QIcon>
          </template>
        </QInput>
      </QCardSection>
      <QCardSection horizontal class='col'>
        <QInput
          hide-bottom-space
          v-model='pickupTime'
          mask='time'
          :rules="['time']"
          label='Pickup Time:'
          lazy-rules='ondemand'
          dense
          outlined
          name='pickup_time'
          stack-label
          bg-color='white'
          class='full-width'
        >
          <template v-slot:append>
            <QIcon name='access_time' class='cursor-pointer'>
              <QPopupProxy
                v-model='showTimePopup'
                cover
                transition-show='scale'
                transition-hide='scale'
              >
                <QTime
                  v-model='pickupTime'
                  name='pickup_date'
                  id='pickup_date'
                  required
                  :rules="['time']"
                  mask='HH:mm'
                >
                  <div class='items-center justify-end row'>
                    <q-btn v-close-popup label='Close' color='brand' flat />
                  </div>
                </QTime>
              </QPopupProxy>
            </QIcon>
          </template>
        </QInput>
      </QCardSection>
    </QCardSection>
    <QCardSection horizontal class='row q-pa-sm q-gutter-sm'>
      <QCardSection horizontal class='col'>
        <QSelect
          hide-bottom-space
          v-model='selectedServiceType'
          for='service-type'
          id='service-type'
          name='service_type'
          dense
          label='Service Type:'
          stack-label
          outlined
          :options='serviceTypeOptions'
          bg-color='white'
          lazy-rules
          :rules="[(val) => !!val || '* Required']"
          class='full-width'
          transition-duration='150'
        />
      </QCardSection>
      <QCardSection horizontal class='col'>
        <QSelect
          hide-bottom-space
          label='Passengers:'
          name='num_passengers'
          id='num_passengers'
          dense
          outlined
          stack-label
          v-model='selectedPassengers'
          :options='passengerOptions'
          bg-color='white'
          lazy-rules
          :rules="[(val) => !!val || '* Required']"
          class='full-width'
          transition-duration='150'
        />
      </QCardSection>
    </QCardSection>
    <QCardSection horizontal class='row q-pa-sm q-gutter-sm'>
      <QCardSection horizontal class='col'>
        <QSelect
          hide-bottom-space
          v-model='selectedVehicleType'
          label='Vehicle Type'
          :options='vehicleTypeOptions'
          dense
          name='vehicle_type'
          outlined
          stack-label
          bg-color='white'
          lazy-rules='ondemand'
          :rules="[(val) => !!val || '* Required']"
          class='full-width'
          transition-duration='150'
        />
      </QCardSection>
      <QCardSection horizontal class='col'>
        <QSelect
          hide-bottom-space
          name='number_of_hours'
          id='num_hours'
          label='Number Of Hours:'
          v-model='selectedNumberOfHours'
          :options='hoursRequiredOptions'
          outlined
          dense
          stack-label
          :disable='!isItHourly'
          bg-color='white'
          lazy-rules='ondemand'
          :rules="[(val) => !!val || '* Required']"
          class='full-width'
          transition-duration='150'
        />
      </QCardSection>
    </QCardSection>
    <QCardSection horizontal class='row q-pa-sm q-gutter-sm'>
      <QCardSection horizontal class='col'>
        <QInput
          hide-bottom-space
          type='text'
          name='first_name'
          id='first_name'
          v-model='firstName'
          label='First Name:'
          outlined
          dense
          stack-label
          lazy-rules
          bg-color='white'
          :rules="[(val) => !!val || '* Required']"
          class='full-width'
        />
      </QCardSection>
      <QCardSection horizontal class='col'>
        <QInput
          hide-bottom-space
          type='text'
          name='last_name'
          id='last_name'
          label='Last Name:'
          dense
          outlined
          stack-label
          v-model='lastName'
          lazy-rules
          :rules="[(val) => !!val || '* Required']"
          bg-color='white'
          class='full-width'
        />
      </QCardSection>
    </QCardSection>
    <QCardSection horizontal class='row q-pt-sm q-px-sm q-gutter-sm'>
      <QCardSection horizontal class='col'>
        <QInput
          hide-bottom-space
          type='email'
          name='email_address'
          id='email'
          label='Email Address:'
          v-model='emailAddress'
          dense
          outlined
          stack-label
          lazy-rules
          :rules="['email']"
          bg-color='white'
          required
          :autocomplete='false'
          class='full-width'
        />
      </QCardSection>
      <QCardSection horizontal class='col'>
        <Vue3QTelInput
          v-model:tel='phoneNumber'
          dense
          outlined
          stack-label
          lazy-rules
          bg-color='white'
          label='Phone Number:'
          name='phone_number'
          id='phone_number'
          input-mask='phone'
          :required='false'
          class='full-width'
        />
      </QCardSection>
    </QCardSection>
    <QCardSection horizontal class='row q-pb-sm q-px-sm'>
      <QCheckbox
        name='round_trip'
        id='round_trip'
        label='Round Trip'
        v-model='isRoundTrip'
        color='brand'
        dense
        class='text-white'
      />
      <QBtn v-show='false' label='reset' color='primary'></QBtn>
    </QCardSection>
    <QCardSection horizontal class='row q-pl-sm q-pr-sm q-pb-md q-pt-sm'>
      <QBtn
        id='submit_button'
        type='submit'
        label='Get Prices &amp; Availability'
        color='red-8'
        :loading='loading'
        class='full-width'
      />
      <QBtn @click='checkValues' label='Check Values' color='primary'/>
    </QCardSection>
    <input type='hidden' name='tripData' id='tripData' v-model='tripData' />
    <input type='hidden' name='placeData' id='placeData' v-model='placeData' />
  </QForm>
</template>

<!--suppress CssMissingComma -->
<style>
#round_trip>div.q-checkbox__inner.relative-position.non-selectable.q-checkbox__inner--falsy>div {
  background-color: white;
}

#lead_form>div:nth-child(8)>div:nth-child(2)>label>div>div.q-field__control.relative-position.row.no-wrap.bg-white>div.q-field__prepend.q-field__marginal.row.no-wrap.items-center>label>div>div>div>div {
  padding-top: 5px !important;
}

#lead_form>div:nth-child(8)>div:nth-child(2)>label>div>div.q-field__control.relative-position.row.no-wrap.bg-white {
  padding: 0;
}

#lead_form>div:nth-child(8)>div:nth-child(2)>label>div>div.q-field__control.relative-position.row.no-wrap.bg-white>div.q-field__prepend.q-field__marginal.row.no-wrap.items-center>label>div>div>div>div {
  padding-left: 8px;
  padding-right: 6px;
  background: gray;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}

.quasar-form {
  max-width: 600px;
}
</style>
