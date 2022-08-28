<script lang="ts" setup>
import { Rates, Surcharges } from '~/composables/useRateCalculator'
import { Ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useMapStore } from '~~/stores/useMapStore'
import { Loader } from '@googlemaps/js-api-loader'

const config = useRuntimeConfig()
const loader = new Loader({
  apiKey: config.public.MAPS_API_KEY as string,
  libraries: ['places'],
  version: 'weekly',
  region: 'ca',
})

const myMap = ref<HTMLElement>(null)

function initMap(): void {
  loader.load().then(() => {
    const map = new google.maps.Map(myMap.value, {
      mapTypeControl: false,
      fullscreenControl: false,
      center: { lat: 43.65107, lng: -79.347015 },
      zoom: 9,
    })
    new AutocompleteDirectionsHandler(map)
  })

  class AutocompleteDirectionsHandler {
    map: google.maps.Map
    originPlaceId: string
    destinationPlaceId: string
    travelMode: google.maps.TravelMode
    directionsService: google.maps.DirectionsService
    directionsRenderer: google.maps.DirectionsRenderer

    constructor(map: google.maps.Map) {
      this.map = map
      this.originPlaceId = ''
      this.destinationPlaceId = ''
      this.travelMode = google.maps.TravelMode.DRIVING
      this.directionsService = new google.maps.DirectionsService()
      this.directionsRenderer = new google.maps.DirectionsRenderer()
      this.directionsRenderer.setMap(map)

      const originInputOne = ref('origin-input')
      const destinationInputOne = ref('destination-input')
      const originInput = document.getElementById(
        originInputOne.value as string
      ) as HTMLInputElement
      const destinationInput = document.getElementById(
        destinationInputOne.value as string
      ) as HTMLInputElement

      // Specify just the place data fields that you need.
      const originAutocomplete = new google.maps.places.Autocomplete(
        originInput,
        {
          fields: ['all'],
        }
      )

      // Specify just the place data fields that you need.
      const destinationAutocomplete = new google.maps.places.Autocomplete(
        destinationInput,
        {
          fields: ['all'],
        }
      )
      console.log(originAutocomplete)
      console.log(destinationAutocomplete)

      this.setupPlaceChangedListener(originAutocomplete, 'ORIG')
      this.setupPlaceChangedListener(destinationAutocomplete, 'DEST')
    }

    setupPlaceChangedListener(
      autocomplete: google.maps.places.Autocomplete,
      mode: string
    ) {
      autocomplete.bindTo('bounds', this.map)

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace()
        const { address_components, formatted_address, name, geometry } = place
        const addressComponents =
          address_components as google.maps.GeocoderAddressComponent[]
        const lat = geometry.location.lat() as number
        const lng = geometry.location.lng() as number
        const formattedAddress = formatted_address as string
        const placeName = name as string
        const address = addressComponents.map(({ long_name, short_name }) => ({
          longName: long_name as string,
          shortName: short_name as string,
        }))
        console.log(address)
        console.log(formattedAddress)
        console.log(placeName)
        console.log(lat)
        console.log(lng)
        if (mode === 'ORIG') {
          origin_address_components.value = addressComponents
          origin_formatted_address.value = formattedAddress
          origin_place_name.value = placeName
          origin_lat.value = lat
          origin_lng.value = lng
        } else {
          destination_address_components.value = addressComponents
          destination_formatted_address.value = formattedAddress
          destination_place_name.value = placeName
          destination_lat.value = lat
          destination_lng.value = lng
        }

        if (!place.place_id) {
          window.alert('Please select an option from the dropdown list.')
          return
        }

        if (mode === 'ORIG') {
          this.originPlaceId = place.place_id
        } else {
          this.destinationPlaceId = place.place_id
        }
        this.route()
        if (destination_lat.value && origin_lat.value) {
        }
      })
    }

    route() {
      if (!this.originPlaceId || !this.destinationPlaceId) {
        return
      }

      const me = this

      this.directionsService.route(
        {
          origin: { placeId: this.originPlaceId },
          destination: { placeId: this.destinationPlaceId },
          travelMode: this.travelMode,
        },
        (response, status) => {
          console.log(response)
          if (status === 'OK') {
            me.directionsRenderer.setDirections(response)
            distance_traveled.value = (response.routes[0].legs[0].distance
              .value / 1000) as number
            duration_traveled.value = (response.routes[0].legs[0].duration
              .value / 60) as number
            origin_location.value = response.routes[0].legs[0].start_address
            destination_location.value = response.routes[0].legs[0].end_address
            origin_location_type.value = response.geocoded_waypoints[0]
              .types[0] as string
            destination_location_type.value = response.geocoded_waypoints[1]
              .types[0] as string
          } else {
            window.alert('Directions request failed due to ' + status)
          }
        }
      )
    }
  }
}

onMounted(() => {
  if (myMap.value) {
    initMap()
  }
})

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
] as FormOptions[]

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
] as FormOptions[]
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
] as FormOptions[]

const hoursRequiredOptions = [
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
] as FormOptions[]

//data for Google Maps autocomplete from the maps store
const mapStore = useMapStore()
const {
  distance_traveled,
  duration_traveled,
  origin_location,
  origin_location_type,
  destination_location,
  destination_location_type,
  origin_address_components,
  destination_address_components,
  origin_lng,
  origin_lat,
  destination_lng,
  destination_lat,
  origin_formatted_address,
  destination_formatted_address,
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
  num_passengers,
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
const isItHourly = ref(false)
const showDestinationInput = ref(true)
const showHourlyInput = ref(false)

watch(service_type, () => {
  if (service_type.value.value === 4) {
    isItHourly.value = true
    showDestinationInput.value = false
    showHourlyInput.value = true
  } else {
    isItHourly.value = false
    showDestinationInput.value = true
    showHourlyInput.value = false
  }
  console.log(
    service_type.value.label,
    service_type.value.value,
    isItHourly.value
  )
})

const loading = ref(false) as Ref<boolean>

// const formattedDate = ref(qdate.formatDate(pickup_date.value, 'YYYY-MM-DD')) //form submission logic
const onSubmit = async () => {
  loading.value = true
  const rates = (await $fetch('/api/rates')) as Rates[]
  const surcharges = (await $fetch('/api/surcharges')) as Surcharges
  console.log(vehicle_type.value.value, vehicle_type.value.label)
  const serviceRate = getRateFromId(vehicle_type.value.value, rates)
  console.log(serviceRate)
  const baseRate = getBaseRate(
    isItHourly.value,
    number_of_hours.value,
    distance_traveled.value,
    serviceRate as Rates
  ) as number
  console.log(baseRate)
  const { fuelSurcharge, gratuity, HST } = getSurchargeAmounts(
    baseRate,
    surcharges
  )
  const sumOfSurcharges = ref(baseRate + fuelSurcharge + gratuity + HST)
  total_cost.value = usePrecision(sumOfSurcharges, 2) as unknown as number

  console.log(total_cost.value)
  //make total cost have 2 decimal places

  //add the separated rate data to the quote store
  base_rate.value = baseRate
  fuel_surcharge.value = fuelSurcharge
  gratuity_rate.value = gratuity
  hst.value = HST

  const submissionInfo = {
    fields: [
      {
        objectTypeId: '0-1',
        name: 'pick_up_date',
        value: pickup_date.value,
      },
      {
        objectTypeId: '0-1',
        name: 'pick_up_time',
        value: pickup_time.value,
      },
      {
        objectTypeId: '0-1',
        name: 'vehicle_type',
        value: vehicle_type.value.label,
      },
      {
        objectTypeId: '0-1',
        name: 'origin_formatted_address',
        value: origin_formatted_address.value,
      },
      {
        objectTypeId: '0-1',
        name: 'destination_formatted_address',
        value: destination_formatted_address.value,
      },
      {
        objectTypeId: '0-1',
        name: 'firstname',
        value: first_name.value,
      },
      {
        objectTypeId: '0-1',
        name: 'lastname',
        value: last_name.value,
      },
      {
        objectTypeId: '0-1',
        name: 'email',
        value: email_address.value,
      },
      {
        objectTypeId: '0-1',
        name: 'phone',
        value: phone_number.value,
      },
      {
        objectTypeId: '0-1',
        name: 'service_type',
        value: service_type.value.label,
      },

      {
        objectTypeId: '0-1',
        name: 'deal_amount',
        value: total_cost.value,
      },
      {
        objectTypeId: '0-1',
        name: 'pax_amount',
        value: num_passengers.value.label,
      },
      {
        objectTypeId: '0-1',
        name: 'hours',
        value: number_of_hours.value,
      },
    ],
  }
  console.log(submissionInfo)

  const vehicleImages = () => {
    if (vehicle_type.value.label === 'Standard Sedan') {
      return 'https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/8c7c6a8d-06ad-4278-1c70-9d497b1cb200/1024'
    } else if (vehicle_type.value.label === 'Premium Sedan') {
      return 'https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/5d171f30-de2f-447c-a602-95ccf248c600/1024'
    } else if (vehicle_type.value.label === 'Standard SUV') {
      return 'https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/b4bf6461-ba55-48bd-e0ba-d613ae383000/1024'
    } else {
      return 'https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/5d80107f-4800-45ae-8e20-c4adf2792f00/1024'
    }
  }
  vehicle_image.value = vehicleImages() as unknown as string
  console.log(vehicle_image.value)

  const { data: successMessage } = await useFetch('/api/formSubmit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: submissionInfo,
  })
  console.log(successMessage.value)

  await mapStore.zapTest()

  const router = useRouter()
  setTimeout(() => {
    router.push('/quoted')
  }, 750)
  loading.value = false
}

const inputOptions = ref({
  placeholder: 'Phone Number',
  showDialCode: true,
  required: true,
  invalidMsg: 'Please enter a valid phone number',
})

//todo: make the form reset without it having all of the inputs with errors
//todo: integrate with stripe for payment
//todo: add logic to check if the user picked an airport, if true add extra to the cost
//todo: debounce the inputs so they don't continuously get error messages from the inputs
//todo: add waypoints to the route for the quote
//todo: add popup to show images of the vehicles
//todo: add popup to show the terms and conditions
const onReset = () => ref(null)
</script>

<template>
  <q-form
    bordered
    rounded-borders
    no-error-focus
    no-reset-focus
    tag="form"
    @submit.prevent="onSubmit"
    @reset="onReset"
    id="lead_form"
    ref="myForm"
    class="max-w-xl mx-auto q-px-md q-py-md bg-black"
  >
    <q-card-section>
      <div class="text-center text-white text-h5">Instant Quote</div>
    </q-card-section>
    <q-card-section>
      <input
        type="text"
        id="origin-input"
        name="origin-input"
        placeholder="Enter Pickup Address or Airport Code"
        v-model="origin_location"
        ref="originLocation"
        class="w-full px-3 py-2 text-gray-500 placeholder-gray-400 bg-white focus:border-primary focus:outline-primary focus:ring-primary/90"
        required
        :rules="[(val) => !!val || 'Please Enter a Destination']"
      />
    </q-card-section>
    <q-card-section v-if="showDestinationInput">
      <q-field
        type="text"
        name="destination-input"
        placeholder="Enter Pickup Address or Airport Code"
        v-model="destination_location"
        required
        :rules="[(val) => !!val || 'Please Enter a Destination']"
        dense
        outlined
        square
        stack-label
        borderless
        hide-bottom-space
        for="destination-input"
      >
        <input
          type="text"
          id="destination-input"
          v-model="destination_location"
          ref="destinationLocation"
          class="w-full px-3 py-2 text-gray-500 placeholder-gray-400 bg-white focus:border-primary focus:outline-primary focus:ring-primary/90"
        />
      </q-field>
    </q-card-section>
    <q-card-section class="flex flex-col xs:flex-row q-pa-none">
      <q-card-section class="col">
        <q-input
          hide-bottom-space
          v-model="pickup_date"
          mask="date"
          :rules="['date']"
          outlined
          dense
          square
          stack-label
          label="Pick Up Date:"
          bg-color="white"
          lazy-rules="ondemand"
        >
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
                v-model="showDatePopup"
              >
                <q-date
                  name="pickup_date"
                  id="pickup_date"
                  v-model="pickup_date"
                >
                  <div class="items-center justify-end row">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </q-card-section>
      <q-card-section class="col">
        <q-input
          hide-bottom-space
          v-model="pickup_time"
          mask="time"
          :rules="['time']"
          label="Pickup Time:"
          lazy-rules="ondemand"
          dense
          square
          outlined
          stack-label
          bg-color="white"
        >
          <template v-slot:append>
            <q-icon name="access_time" class="cursor-pointer">
              <q-popup-proxy
                v-model="showTimePopup"
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-time
                  v-model="pickup_time"
                  name="pickup_date"
                  id="pickup_date"
                >
                  <div class="items-center justify-end row">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-time>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </q-card-section>
    </q-card-section>
    <q-card-section class="flex flex-col xs:flex-row q-pa-none">
      <q-card-section class="col">
        <q-select
          hide-bottom-space
          v-model="service_type"
          for="service-type"
          id="service-type"
          dense
          label="Service Type:"
          stack-label
          outlined
          square
          :options="serviceTypeOptions"
          :rules="[(val) => !!val || 'Please Select a Service Type']"
          bg-color="white"
          lazy-rules="ondemand"
        />
      </q-card-section>
      <q-card-section class="col">
        <q-select
          hide-bottom-space
          label="Passengers:"
          name="num_passengers"
          id="num_passengers"
          dense
          outlined
          square
          stack-label
          v-model="num_passengers"
          :options="passengerOptions"
          bg-color="white"
          lazy-rules="ondemand"
          :rules="[(val) => !!val || 'Please Select the Number of Passengers']"
        />
      </q-card-section>
    </q-card-section>
    <q-card-section v-if="showHourlyInput" class="col">
      <q-select
        hide-bottom-space
        name="num_hours"
        id="num_hours"
        label="Number Of Hours:"
        v-model="number_of_hours"
        :options="hoursRequiredOptions"
        outlined
        square
        dense
        bg-color="white"
        lazy-rules="ondemand"
        :rules="[(val) => !!val || 'Please Select the Hours Required']"
      />
    </q-card-section>
    <q-card-section class="flex flex-col xs:flex-row q-pa-none">
      <q-card-section class="col">
        <q-input
          hide-bottom-space
          type="text"
          name="first_name"
          id="first_name"
          v-model="first_name"
          label="First Name:"
          outlined
          square
          dense
          stack-label
          :rules="[(val) => !!val || 'First Name is required']"
          lazy-rules="ondemand"
          bg-color="white"
        />
      </q-card-section>
      <q-card-section class="col">
        <q-input
          hide-bottom-space
          type="text"
          name="last_name"
          id="last_name"
          label="Last Name:"
          dense
          outlined
          square
          stack-label
          v-model="last_name"
          :rules="[(val) => !!val || 'Last Name is required']"
          lazy-rules="ondemand"
          bg-color="white"
        />
      </q-card-section>
    </q-card-section>
    <q-card-section class="flex flex-col xs:flex-row q-pa-none">
      <q-card-section class="col">
        <q-input
          hide-bottom-space
          type="email"
          name="email"
          id="email"
          label="Email Address:"
          v-model="email_address"
          dense
          outlined
          square
          stack-label
          lazy-rules="ondemand"
          :rules="['email']"
          bg-color="white"
          :autocomplete="false"
        />
      </q-card-section>
      <q-card-section class="col">
        <q-field
          name="phone"
          id="phone"
          v-model="phone_number"
          dense
          outlined
          square
          color="black"
          bg-color="white"
          class="w-full"
        >
          <vue-tel-input
            v-model="phone_number"
            mode="international"
            :inputOptions="inputOptions"
            class="w-full"
            lazy-rules="ondemand"
          />
        </q-field>
      </q-card-section>
    </q-card-section>
    <q-card-section>
      <q-select
        hide-bottom-space
        v-model="vehicle_type"
        class="text-gray-500"
        label="Vehicle Type"
        :options="vehicleTypeOptions"
        dense
        outlined
        square
        stack-label
        :rules="[(val) => !!val || 'Please pick a Vehicle Type']"
        bg-color="white"
        lazy-rules="ondemand"
      />
    </q-card-section>
    <q-card-section v-show="false">
      <q-checkbox
        name="round_trip"
        id="round_trip"
        class="text=white"
        label="Round Trip"
        v-model="is_round_trip"
        color="primary"
      />
    </q-card-section>
    <q-card-actions align="around" id="submit_button_wrapper">
      <q-btn
        id="submit_button"
        type="submit"
        label="Get Prices &amp; Availability"
        color="red-8"
        :loading="loading"
      />
    </q-card-actions>
    <q-card-section flat class="w-full h-full" v-show="false">
      <div ref="myMap" id="my-map"></div>
    </q-card-section>
  </q-form>
</template>
<!--suppress CssMissingComma -->
<style>
#my-map {
  height: 100% !important;
  max-width: 500px !important;
}

#round_trip
  > div.q-checkbox__inner.relative-position.non-selectable.q-checkbox__inner--falsy
  > div {
  background-color: white;
}

#phone > div > div {
  padding: 0 !important;
}

#phone > div > div > div > div > div {
  background-color: rgb(0, 0, 0, 0.1);
  border: #333333;
}

#lead_form > div:nth-child(7) > div:nth-child(2) > label > div > div {
  padding: 0 !important;
}

#phone {
  padding: 0 !important;
}

div.q-card__section:nth-child(3) > label:nth-child(1) {
  padding-top: 0;
  padding-bottom: 0;
}

.bg-dark > div:nth-child(1) {
  padding-left: 0;
  padding-right: 0;
}
</style>
