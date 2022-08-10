<script setup lang="ts">
// import { Loader, LoaderOptions } from '@googlemaps/js-api-loader'
import { Rates, Surcharges } from '~/composables/useRateCalculator'
import { Ref } from 'vue'
import { useContactsStore } from '~/stores/useContactStore'
import { storeToRefs } from 'pinia'
import { useDealStore } from '~/stores/useDealStore'
import { useMapStore } from '~~/stores/useMapStore'
import { useQuoteStore } from '~~/stores/useQuoteStore'
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
          fields: ['place_id'],
        }
      )

      // Specify just the place data fields that you need.
      const destinationAutocomplete = new google.maps.places.Autocomplete(
        destinationInput,
        { fields: ['all'] }
      )

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
            distance_traveled.value =
              response.routes[0].legs[0].distance.value / 1000
            duration_traveled.value =
              response.routes[0].legs[0].duration.value / 60
            origin_location.value = response.routes[0].legs[0].start_address
            destination_location.value = response.routes[0].legs[0].end_address
            origin_location_type.value = response.geocoded_waypoints[0].types[0]
            destination_location_type.value =
              response.geocoded_waypoints[1].types[0]
          } else {
            window.alert('Directions request failed due to ' + status)
          }
        }
      )
    }
  }
}
onMounted(() => {
  initMap()
})

// get the form options from the server
const { data: formOptions } = await useFetch('/api/form-options')
const passengerOptions = ref(formOptions.value[0])
const serviceTypeOptions = ref(formOptions.value[1])
const vehicleTypeOptions = ref(formOptions.value[2])

//data for hubspot contacts from the contact store
const contacts = useContactsStore()
const {
  first_name,
  last_name,
  email_address,
  phone_number,
  // getContactResponse,
} = storeToRefs(contacts)

//data for hubspot deals from the deal store
const deal = useDealStore()
const {
  pickup_date,
  pickup_time,
  service_type,
  vehicle_type,
  num_hours,
  num_passengers,
  // getDealResponse,
} = storeToRefs(deal)

//data for Google Maps autocomplete from the maps store
const googleMapsAutocomplete = useMapStore()
const {
  distance_traveled,
  duration_traveled,
  origin_location,
  origin_location_type,
  destination_location,
  destination_location_type,
} = storeToRefs(googleMapsAutocomplete)

//data for the quote store
const quote = useQuoteStore()
const { base_rate, fuel_surcharge, gratuity_rate, hst, total_cost } =
  storeToRefs(quote)

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

const hsProps = {
  dealstage: 26772045,
  pipeline: 9388939,
  hubspot_owner_id: 191740050,
  dealtype: 'newbusiness',
  hs_marketable_status: 'marketable',
}

//form submission logic
const submitForm = async () => {
  loading.value = true
  const rates = (await $fetch('/api/rates')) as Rates[]
  const surcharges = (await $fetch('/api/surcharges')) as Surcharges
  console.log(vehicle_type.value.value, vehicle_type.value.label)
  const serviceRate = getRateFromId(vehicle_type.value.value, rates)
  console.log(serviceRate)
  const baseRate = getBaseRate(
    isItHourly.value,
    num_hours.value,
    distance_traveled.value,
    serviceRate
  ) as number
  console.log(baseRate)
  const { fuelSurcharge, gratuity, HST } = getSurchargeAmounts(
    baseRate,
    surcharges
  )
  total_cost.value = round(baseRate + fuelSurcharge + gratuity + HST) as number
  console.log(total_cost.value)

  //add the separated rate data to the quote store
  base_rate.value = baseRate
  fuel_surcharge.value = fuelSurcharge
  gratuity_rate.value = gratuity
  hst.value = HST

  //required contact data for hubspot
  const contactData = ref({
    properties: {
      firstname: first_name.value,
      lastname: last_name.value,
      email: email_address.value,
      phone: phone_number.value,
    },
  })
  console.log(contactData.value)

  const { data: contacts } = await useFetch('/api/contacts', {
    method: 'POST',
    body: contactData.value,
  })
  console.log(contacts.value)

  //required deal data for hubspot
  const dealData = ref({
    properties: {
      amount: total_cost.value,
      dealname: 'Custom Test Deal 3',
      dealstage: hsProps.dealstage,
      pipeline: hsProps.pipeline,
      hubspot_owner_id: hsProps.hubspot_owner_id,
      dealtype: hsProps.dealtype,
    },
  })

  //api call to hubspot to create a deal
  const { data: deal } = await useFetch('/api/deals', {
    method: 'POST',
    body: dealData.value,
  })
  console.log(deal.value)

  //timeout before loading the quote page
  const router = useRouter()
  setTimeout(() => {
    router.push('/quoted')
    // reset()
  }, 1000)
  loading.value = false
}
</script>

<template>
  <div>
    <q-card
      dark
      bordered
      rounded-borders
      tag="form"
      @submit.prevent="submitForm"
      id="lead_form"
      ref="myForm"
      class="max-w-lg mx-auto"
    >
      <q-card-section>
        <div class="text-center text-white text-h5">Instant Quote</div>
      </q-card-section>
      <q-card-section>
        <input
          type="text"
          id="origin-input"
          name="origin-input"
          placeholder="Enter Address, Point of Interest, or Airport Code"
          v-model="origin_location"
          ref="originLocation"
          class="w-full px-3 py-2 text-gray-500 bg-white focus:border-primary focus:outline-primary focus:ring-primary/90"
          required
        />
      </q-card-section>
      <q-card-section v-if="showDestinationInput">
        <input
          type="text"
          id="destination-input"
          name="destination-input"
          placeholder="Enter Address, Point of Interest, or Airport Code"
          v-model="destination_location"
          ref="destinationLocation"
          class="w-full px-3 py-2 text-gray-500 bg-white focus:border-primary focus:outline-primary focus:ring-primary/90"
          required
        />
      </q-card-section>
      <q-card-section horizontal class="">
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
      <q-card-section horizontal>
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
          />
        </q-card-section>
        <q-card-section v-if="showHourlyInput" class="col">
          <q-select
            hide-bottom-space
            name="num_hours"
            id="num_hours"
            label="Number Of Hours:"
            v-model="num_hours"
            :options="['2hr', '2hr 15']"
            outlined
            square
            dense
            bg-color="white"
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
          />
        </q-card-section>
      </q-card-section>
      <q-card-section horizontal>
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
            bg-color="white"
          />
        </q-card-section>
      </q-card-section>
      <q-card-section horizontal>
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
            :rules="['email']"
            bg-color="white"
            :autocomplete="false"
          />
        </q-card-section>
        <q-card-section class="col">
          <q-input
            type="text"
            name="phone"
            id="phone"
            label="Phone Number:"
            v-model="phone_number"
            dense
            outlined
            square
            stack-label
            mask="phone"
            bg-color="white"
          />
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
        />
      </q-card-section>
      <!-- <q-card-section>
        <q-checkbox name="round_trip" id="round_trip" label="Round Trip" v-model="is_round_trip" color="primary" />
      </q-card-section> -->
      <q-card-actions align="around" id="submit_button_wrapper">
        <q-btn
          id="submit_button"
          type="submit"
          label="Get Prices &amp; Availability"
          color="red-8"
          :loading="loading"
        />
      </q-card-actions>
      <q-card-section>
        <div class="text-center text-subtitle2">Terms of Use</div>
      </q-card-section>
    </q-card>
    <q-card class="w-full h-full">
      <q-card-section>
        <div ref="myMap" id="my-map"></div>
      </q-card-section>
    </q-card>
  </div>
</template>
<style>
#my-map {
  height: 100% !important;
  max-width: 500px !important;
}
</style>
