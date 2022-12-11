<script setup lang="ts">
import Datepicker from '@vuepic/vue-datepicker'
import { VueTelInput } from 'vue-tel-input'
import 'vue-tel-input/dist/vue-tel-input.css'
import { useForm, Field } from 'vee-validate'
import { toFormValidator } from '@vee-validate/zod'
import { ValidationSchema, validationSchema } from '~/schema/quoteFormValues'

useHead({
  link: [
    {
      rel: 'stylesheet',
      href: 'https://rsms.me/inter/inter.css',
    },
  ],
})

const schema = toFormValidator(validationSchema)

const passengerCountOptions = [
  { label: 'Select Passengers', value: 0 },
  { label: '1 Passenger', value: 1 },
  { label: '2 Passengers', value: 2 },
  { label: '3 Passengers', value: 3 },
  { label: '4 Passengers', value: 4 },
  { label: '5 Passengers', value: 5 },
  { label: '6 Passengers', value: 6 },
  { label: '7 Passengers', value: 7 },
] as ValidationSchema['passenger_count'][]
const selectedPassengerCount = ref(passengerCountOptions[0])

const serviceTypeOptions = [
  { label: 'Pick A Service Type..', value: 0 },
  { label: 'Point-To-Point', value: 1 },
  { label: 'To-Airport', value: 2 },
  { label: 'From-Airport', value: 3 },
  { label: 'Hourly/As-Directed', value: 4 },
] as ValidationSchema['service_type'][]
const selectedServiceType = ref(serviceTypeOptions[0])

const vehicleTypeOptions = [
  { label: 'Select Vehicle Type..', value: 0 },
  { label: 'Standard Sedan', value: 1 },
  { label: 'Premium Sedan', value: 2 },
  { label: 'Standard SUV', value: 3 },
  { label: 'Premium SUV', value: 4 },
] as ValidationSchema['vehicle_type'][]
const selectedVehicleType = ref(vehicleTypeOptions[0])

const hoursRequiredOptions = [
  {
    label: 'Select Hours',
    value: 0,
  },
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
] as ValidationSchema['hours_required']
const selectedHours = ref(hoursRequiredOptions[0])

const { handleSubmit, errors, isSubmitting } = useForm({
  initialValues: {
    pick_up_location: '',
    drop_off_location: '',
    pick_up_date: null,
    pick_up_time: null,
    service_type: { label: '', value: 0 },
    vehicle_type: { label: '', value: 0 },
    passenger_count: { label: '', value: 0 },
    hours_required: { label: '', value: 0 },
    first_name: '',
    last_name: '',
    email_address: '',
    phone: '',
  },
})

function onInvalidSubmit({ values, errors, results }) {
  console.log(values) // current form values
  console.log(errors) // a map of field names and their first error message
  console.log(results) // a detailed map of field names and their validation results
}

const onSubmit = handleSubmit(async (values) => {
  try {
    const { data, error } = await useFetch('/api/form-submit', {
      method: 'POST',
      body: values,
    })
    return data.value
  } catch (err) {
    console.log(err)
  }
})

const placeChangedOrigin = (e) => {
  console.log(e)
  return e
}
const placeChangedDestination = (e) => {
  console.log(e)
  return e
}

const getDirections = () => {
  console.log('get directions')
}


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
// const date = ref(new Date())
// // In case of a range picker, you'll receive [Date, Date]
// const format = (date) => {
//   const day = date.getDate()
//   const month = date.getMonth() + 1
//   const year = date.getFullYear()
//   return `Selected date is ${day}/${month}/${year}`
// }

interface MinTime {
  hours?: number | string
  minutes?: number | string
  seconds?: number | string
}

const minTime = ref<MinTime | null>(null)
//todo add validation, add icon to datepicker, add logic to submit the form
</script>

<template>
  <form
    :validation-schema="schema"
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
    <div class="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
      <!--      Pickup Date-->
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
    <div class="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
      <!--      Service Type-->
      <InputListbox
        class="md:col-span-1"
        v-model="selectedServiceType"
        :options="serviceTypeOptions"
        name="service_type"
      ></InputListbox>
      <!--vehicle type-->
      <InputListbox
        class="md:col-span-1"
        v-model="selectedVehicleType"
        :options="vehicleTypeOptions"
        name="vehicle_type"
      ></InputListbox>
    </div>
    <div class="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
      <!--      Service Type-->
      <InputListbox
        class="md:col-span-1"
        v-model="selectedPassengerCount"
        :options="passengerCountOptions"
        name="passenger_count"
      ></InputListbox>
      <!--      Selected hours-->
      <InputListbox
        class="md:col-span-1"
        v-model="selectedHours"
        :options="hoursRequiredOptions"
        name="hours_required"
      ></InputListbox>
    </div>

    <div class="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
      <!--      First Name-->
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
    <div class="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
      <!--      Email-->
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
