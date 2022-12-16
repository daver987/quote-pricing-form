<script setup lang="ts">
import { markRaw } from 'vue'
import VueDatepicker from '@vuepic/vue-datepicker'
import { enUS } from 'date-fns/locale'
import { isSameDay, set } from 'date-fns'

const library = markRaw({
  VueDatepicker: VueDatepicker,
})

const data = reactive({
  pickup_date: '',
  pickup_time: '',
})

async function submit() {
  await new Promise((r) => setTimeout(r, 1000))
  alert('Submitted! 🎉')
}

const schema = [
  {
    $el: 'h3',
    attrs: {
      class: 'uppercase text-4xl font-bold',
    },
    children: 'Instant Quote',
  },
  {
    $el: 'div',
    class: 'w-full grid grid-cols-1 gap-4',
    children: [
      {
        $formkit: 'placesAutocomplete',
        name: 'pickup_location',
        label: 'Pickup Location',
        id: 'origin',
      },
    ],
  },
  {
    $el: 'div',
    attrs: {
      class: 'w-full grid grid-cols-1 gap-4',
    },
    children: [
      {
        $formkit: 'placesAutocomplete',
        name: 'dropoff_location',
        label: 'Dropoff Location',
        id: 'destination',
      },
    ],
  },
  {
    $el: 'div',
    attrs: {
      class: 'w-full grid grid-cols-1 md:grid-cols-2 gap-4',
    },
    children: [
      // {
      //   $cmp: 'VueDatepicker',
      //   props: {
      //     name: 'pickup_date',
      //     value: '$pickup_date',
      //     clearable: true,
      //     placeholder: 'Pickup Date',
      //   },
      // },
      {
        $formkit: 'datepicker',
      },
      {
        $cmp: 'VueDatepicker',
        props: {
          name: 'pickup_time',
          value: '$pickup_time',
          clearable: true,
          placeholder: 'Pickup Time',
          class: 'col-span-1 w-full',
        },
      },
    ],
  },
  {
    $el: 'div',
    attrs: {
      class: 'w-full grid grid-cols-1 md:grid-cols-2 gap-4',
    },
    children: [
      {
        $formkit: 'dropdown',
        name: 'num_passengers',
        label: 'Passenger Count',
        id: 'num_passengers',
        help: 'The number of passengers',
        validation: '',
        class: 'w-full col-span-1',
      },
      {
        $formkit: 'dropdown',
        name: 'number_of_hours',
        label: 'Number Of Hours',
        id: 'number_of_hours',
        help: 'The Number of Hours for Hourly Service',
        validation: '',
        class: 'w-full col-span-1',
      },
    ],
  },
  {
    $el: 'div',
    attrs: {
      class: 'w-full grid grid-cols-1 md:grid-cols-2 gap-4',
    },
    children: [
      {
        $formkit: 'dropdown',
        name: 'service_type',
        label: 'Service Type',
        id: 'service_type',
        help: 'The Type of Service',
        validation: '',
        options: [
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
        ],
      },
      {
        $formkit: 'dropdown',
        name: 'vehicle_type',
        label: 'Vehicle Type',
        id: 'vehicle_type',
        help: 'The Type of Vehicle Requested',
        validation: '',
        options: [
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
        ],
      },
    ],
  },
  {
    $el: 'div',
    attrs: {
      class: 'w-full grid grid-cols-1 md:grid-cols-2 gap-4',
    },
    children: [
      {
        $formkit: 'text',
        name: 'firstname',
        label: 'First Name',
        id: 'firstname',
        validation: 'required',
        class: 'w-full col-span-1',
      },
      {
        $formkit: 'text',
        name: 'lastname',
        label: 'Last Name',
        id: 'lastname',
        validation: 'required',
        class: 'w-full col-span-1',
      },
    ],
  },
  {
    $el: 'div',
    attrs: {
      class: 'w-full grid grid-cols-1 md:grid-cols-2 gap-4',
    },
    children: [
      {
        $formkit: 'text',
        name: 'email',
        label: 'Email',
        id: 'email',
        validation: 'required',
        class: 'col-span-1 md:col-span-2 w-full',
      },
      {
        $formkit: 'tel',
        name: 'phone',
        label: 'Phone',
        id: 'phone',
        validation: 'required',
        class: 'col-span-1 md:col-span-2 w-full',
      },
    ],
  },
]

const selected = ref('')

const to = ref(null) as unknown
const from = ref(null) as unknown
const locale = computed(() => enUS)
</script>

<template>
  <div class="w-full grid grid-cols-2 gap-4">
    <div class="max-w-2xl col-span-1">
      <FormKit type="form" #default="{ value }" @submit="submit">
        <FormKitSchema :schema="schema" :library="library" :data="data">
        </FormKitSchema>
        <pre>{{ value }}</pre>
      </FormKit>
    </div>
    <div class="col-span-1">
      <h1>Second side of form</h1>
      <div>
        <DatePicker
          class="picker"
          v-model="selected"
          :locale="locale"
          minimum-view="time"
          inputFormat="dd-MM-yyyy  HH:mm"
          placeholder="Pickup Date and Time"
          clearable
        >
          <template v-slot:clear="{ onClear }">
            <button @click="onClear">x</button>
          </template>
        </DatePicker>
      </div>
      <!--      <FormKit type="form" #default="{ value }" @submit="submit">-->
      <!--        <FormKit type="placesAutocomplete" label="This is autocomplete label" />-->
      <!--        <FormKit-->
      <!--          type="placesAutocomplete"-->
      <!--          label="This is autocomplete 2 label"-->
      <!--        />-->
      <!--        <pre>{{ value }}</pre>-->
      <!--      </FormKit>-->
    </div>
  </div>
</template>

<style scoped>
pre {
  background-color: rgba(0, 100, 250, 0.1);
  padding: 1em;
}

.picker {
  color: #3c4a5a;
}
</style>
