<script setup lang="ts">
import Datepicker from '@vuepic/vue-datepicker'
import { VueTelInput } from 'vue-tel-input'
import 'vue-tel-input/dist/vue-tel-input.css'
import { useForm, Field } from 'vee-validate'
import {
  ValidationSchema,
  validationSchema,
  placeAutocompleteSchema,
} from '~/schema/quoteFormValues'
import { useHead } from '#app'

useHead({
  link: [
    {
      rel: 'stylesheet',
      href: 'https://rsms.me/inter/inter.css',
    },
  ],
})

const vehicleTypeOptions = [
  { name: 'Select Vehicle Type...', value: 0 },
  { name: 'Standard Sedan', value: 1 },
  { name: 'Premium Sedan', value: 2 },
  { name: 'Standard SUV', value: 3 },
  { name: 'Premium SUV', value: 4 },
] as ValidationSchema['vehicle_type'][]
const selectedVehicleType = ref(vehicleTypeOptions[0])

const passengerCountOptions = [
  { name: 'Passengers', value: 0 },
  { name: '1 Passenger', value: 1 },
  { name: '2 Passengers', value: 2 },
  { name: '3 Passengers', value: 3 },
  { name: '4 Passengers', value: 4 },
  { name: '5 Passengers', value: 5 },
  { name: '6 Passengers', value: 6 },
  { name: '7 Passengers', value: 7 },
] as ValidationSchema['passenger_count'][]
const selectedPassengerCount = ref(passengerCountOptions[0])
// const passengerCountOptionsSedan = [
//   { name: '1 Passenger', value: 1 },
//   { name: '2 Passengers', value: 2 },
//   { name: '3 Passengers', value: 3 },
// ] as ValidationSchema['passenger_count'][]
//
// const passengerCountOptionsPremiumSUV = [
//   { name: '1 Passenger', value: 1 },
//   { name: '2 Passengers', value: 2 },
//   { name: '3 Passengers', value: 3 },
//   { name: '4 Passengers', value: 4 },
//   { name: '5 Passengers', value: 5 },
//   { name: '6 Passengers', value: 6 },
// ] as ValidationSchema['passenger_count'][]

// const selectedPassengerCount2 = ref(null)
// const selectedPassengerCount3 = ref(null)
//
// const defaultPassengerOptions = ref(true)
// const sedanPassengerOptions = ref(false)
// const premiumSUVPassengerOptions = ref(false)

// watch(selectedVehicleType, (value) => {
//   console.log('selectedVehicleType', value.name)
//   if (value.name === 'Standard Sedan' || 'Premium Sedan') {
//     defaultPassengerOptions.value = false
//     sedanPassengerOptions.value = true
//     premiumSUVPassengerOptions.value = false
//   } else if (value.name === 'Premium SUV') {
//     defaultPassengerOptions.value = false
//     sedanPassengerOptions.value = false
//     premiumSUVPassengerOptions.value = true
//   } else {
//     defaultPassengerOptions.value = true
//     sedanPassengerOptions.value = false
//     premiumSUVPassengerOptions.value = false
//   }
// })

const serviceTypeOptions = [
  { name: 'Select Service Type...', value: 0 },
  { name: 'Point-To-Point', value: 1 },
  { name: 'To-Airport', value: 2 },
  { name: 'From-Airport', value: 3 },
  { name: 'Hourly/As-Directed', value: 4 },
] as ValidationSchema['service_type'][]
const selectedServiceType = ref(serviceTypeOptions[0])

const isDisabled = ref(true)
watch(selectedServiceType, (value) => {
  if (value.name === 'Hourly/As-Directed') {
    isDisabled.value = false
  } else {
    isDisabled.value = true
    selectedHours.value = hoursRequiredOptions[0]
  }
  console.log('selectedServiceType', value.name)
  console.log('isDisabled', isDisabled.value)
})

const hoursRequiredOptions = [
  {
    name: 'Hours For Hourly',
    value: 0,
  },
  {
    name: '2 hrs',
    value: 2,
  },
  {
    name: '3 hrs',
    value: 3,
  },
  {
    name: '4 hrs',
    value: 4,
  },
  {
    name: '5 hrs',
    value: 5,
  },
  {
    name: '6 hrs',
    value: 6,
  },
  {
    name: '7 hrs',
    value: 7,
  },
  {
    name: '8 hrs',
    value: 8,
  },
  {
    name: '9 hrs',
    value: 9,
  },
  {
    name: '10 hrs',
    value: 10,
  },
  {
    name: '11 hrs',
    value: 11,
  },
  {
    name: '12 hrs',
    value: 12,
  },
] as ValidationSchema['hours_required'][]
const selectedHours = ref(hoursRequiredOptions[0])

const { handleSubmit, errors, isSubmitting } = useForm({
  validationSchema,
  initialValues: {
    pick_up_location: '',
    drop_off_location: '',
    pick_up_date: null,
    pick_up_time: null,
    service_type: '',
    vehicle_type: '',
    passenger_count: '',
    hours_required: {
      name: 'Hours For Hourly',
    },
    first_name: '',
    last_name: '',
    email_address: '',
    phone: '',
  },
})

const origin = ref(null)

const placeChangedOrigin = (evt) => {
  console.log(evt)
  origin.value = evt
  return origin.value
}
const destination = ref(null)
const placeChangedDestination = (evt) => {
  destination.value = evt
  console.log(evt)
  return destination.value
}

const onSubmit = handleSubmit(async (values) => {
  try {
    const places = placeAutocompleteSchema.safeParse({
      origin: origin.value,
      destination: destination.value,
    })
    console.log(places)
    if (places.success) {
      console.log('success')
    } else {
      console.log('error')
    }
    const { data } = await useLazyFetch('/api/form-submit', {
      method: 'POST',
      body: { values, origin: origin.value, destination: destination.value },
    })
    return data.value
  } catch (err) {
    console.log(err)
  }
})

const inputOptions = ref({
  id: 'phone_number',
  required: true,
  styleClasses:
    'block w-full rounded-md shadow-sm focus:border-brand focus:ring-brand sm:text-sm',
  showDialCode: true,
})

const dropdownOptions = ref({
  showDialCodeInSelection: false,
  showFlags: true,
  showDialCodeInList: true,
})

const pickUpDate = ref('')
const pickUpTime = ref('')
const phone = ref('')

//write a function to get the current time and then add 2 hours to it
const setTimeTwoHoursAhead = () => {
  const currentTime = new Date()
  return currentTime.setHours(currentTime.getHours() + 2)
}

//destructure the setTimeTwoHoursAhead function to return the hours and minutes
const getHoursAndMinutes = (): MinTime => {
  const [hours, minutes] = new Date(setTimeTwoHoursAhead())
    .toTimeString()
    .split(':')
  console.log(hours, minutes)
  minTime.value = {
    hours: parseInt(hours),
    minutes: parseInt(minutes),
  }
  return minTime.value as MinTime
}

interface MinTime {
  hours?: number | string
  minutes?: number | string
  seconds?: number | string
}

const minTime = ref<MinTime | null>(null)
</script>

<template>
  <form
    :validation-schema="validationSchema"
    @submit="onSubmit"
    class="max-w-xl px-6 pt-6 pb-10 space-y-3 bg-black border border-white rounded-lg shadow-lg border-1"
  >
    <h3
      class="text-2xl font-medium tracking-widest text-center text-white uppercase"
    >
      Instant Quote
    </h3>

    <!--    Pickup Location Autocomplete-->
    <div class="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
      <Field name="origin" v-slot="{ field }">
        <InputPlacesAutocomplete
          class="w-full md:col-span-2"
          id="origin"
          placeholder="Enter a Pick Up Location"
          :error-message="errors.pick_up_location"
          name="pick_up_location"
          type="text"
          label="Pick Up Location"
          @change="placeChangedOrigin"
        />
      </Field>
    </div>

    <!--    Drop Off Location Autocomplete-->
    <div class="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
      <InputPlacesAutocomplete
        class="w-full md:col-span-2"
        id="destination"
        placeholder="Enter a Drop Off Location"
        :error-message="errors.drop_off_location"
        name="drop_off_location"
        type="text"
        label="Drop Off Location"
        success-message="Success"
        @change="placeChangedDestination"
      />
    </div>

    <!--      Pickup Date-->
    <div class="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
      <Field name="pick_up_date" v-slot="{ field }">
        <Datepicker
          v-bind="field"
          v-model="pickUpDate"
          class="md:col-span-1"
          id="pick_up_date"
          placeholder="Pick Up Date"
          select-text="Pick Up Date"
          required
          :minDate="new Date()"
          prevent-min-max-navigation
          :enable-time-picker="false"
          format="dd-MM-yyyy"
          inputClassName="placeholder-gray-500"
        />
      </Field>

      <!--      Pickup Time-->
      <Field name="pick_up_time" v-slot="{ field }">
        <Datepicker
          v-bind="field"
          class="md:col-span-1"
          id="pick_up_time"
          placeholder="Pick Up Time"
          :time-picker="true"
          v-model="pickUpTime"
          select-text="Pick Up Time"
          required
          minutes-increment="5"
          @open="getHoursAndMinutes()"
          :min-time="minTime"
          :is24="false"
          inputClassName="placeholder-gray-500"
          ,
        >
          <template #input-icon>
            <IconClock
              class="mx-2 my-6 text-color-[rgb(149, 149, 149)]"
              width="20"
              height="20"
            />
          </template>
        </Datepicker>
      </Field>
    </div>

    <!--      Service Type-->
    <div class="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
      <InputListbox
        class="md:col-span-1"
        v-model="selectedServiceType"
        :options="serviceTypeOptions"
        name="service_type"
        key-prop="name"
        label-prop="name"
      ></InputListbox>

      <!--vehicle type-->
      <InputListbox
        class="md:col-span-1"
        v-model="selectedVehicleType"
        :options="vehicleTypeOptions"
        name="vehicle_type"
        key-prop="name"
        label-prop="name"
      ></InputListbox>
    </div>

    <!--      Service Type-->
    <div class="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
      <InputListbox
        class="md:col-span-1"
        v-model="selectedPassengerCount"
        :options="passengerCountOptions"
        name="passenger_count"
        key-prop="name"
        label-prop="name"
        label="Passengers"
      ></InputListbox>

      <!--      Selected hours-->
      <InputListbox
        :disabled="isDisabled"
        class="md:col-span-1"
        v-model="selectedHours"
        :options="hoursRequiredOptions"
        name="hours_required"
        key-prop="name"
        label-prop="name"
      ></InputListbox>
    </div>

    <!--      First Name-->
    <div class="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
      <InputText
        class="md:col-span-1"
        type="text"
        name="first_name"
        id="first_name"
        placeholder="First Name"
        :error-message="errors.first_name"
        label="First Name"
        success-message="Success"
      />

      <!--      Last Name-->
      <InputText
        class="md:col-span-1"
        type="text"
        name="last_name"
        id="last_name"
        placeholder="Last Name"
        :error-message="errors.last_name"
        label="Last Name"
        success-message="Success"
      />
    </div>

    <!--      Email-->
    <div class="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
      <InputText
        class="md:col-span-1"
        name="email_address"
        type="text"
        id="email_address"
        placeholder="Email Address"
        label="Email Address"
        :error-message="errors.email_address"
      />

      <!--      Phone-->
      <Field name="phone" v-slot="{ field, value, errors }">
        <VueTelInput
          v-bind="field"
          v-model="phone"
          :dropdownOptions="dropdownOptions"
          :inputOptions="inputOptions"
          styleClasses="md:col-span-1"
          invalidMsg="Please enter a valid phone number"
        ></VueTelInput>
      </Field>
    </div>
    <div class="flex flex-col gap-6">
      <button
        :disabled="isSubmitting"
        type="submit"
        class="rounded-md w-full relative font-medium tracking-wide uppercase bg-red-700 inline-flex group items-center justify-center px-3.5 py-2 cursor-pointer active:shadow-none shadow-lg text-white"
      >
        Get Pricing and Availability
      </button>
    </div>
  </form>
</template>
