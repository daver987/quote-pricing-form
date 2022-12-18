import { markRaw } from 'vue'
import VueTelInput from 'vue-tel-input'
import InputPlacesAutocomplete from '../components/Input/InputPlacesAutocomplete.vue'

const library = markRaw({
  VueTelInput: VueTelInput,
  InputPlacesAutocomplete: InputPlacesAutocomplete,
})

export const data = reactive({
  pickup_date: '',
  pickup_time: '',
})
export const formSchema = [
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
        $comp: 'InputPlacesAutocomplete',
        props: {
          name: 'pickup_location',
          label: 'Pickup Location',
          id: 'pickup-location',
        },
        attrs: {
          class: 'w-full col-span-1',
        },
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
        $comp: 'InputPlacesAutocomplete',
        props: {
          type: 'text',
          name: 'destination',
          label: 'Drop Off Location',
        },
        attrs: {
          class: 'w-full grid-cols-1 gap-4',
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
        $formkit: 'date',
        name: 'pickup_date',
        label: 'Pickup Day',
        id: 'pickup_date',
        help: 'The pickup Date for the order',
        validation: 'required',
        class: 'w-full col-span-1',
      },
      {
        $formkit: 'date',
        name: 'pickup_time',
        label: 'Pickup Time',
        id: 'pickup_time',
        help: 'The pickup Time for the order',
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
  {
    $el: 'div',
    attrs: {
      class: 'w-full grid grid-cols-1 md:grid-cols-2 gap-4 pb-4',
    },
    children: [
      {
        $cmp: 'VueDatepicker',
        props: {
          name: 'pickup_date',
          value: '$pickup_date',
          clearable: true,
          placeholder: 'Pickup Date',
        },
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
      // {
      //   $formkit: 'tel',
      //   name: 'phone',
      //   label: 'Phone',
      //   id: 'phone',
      //   validation: 'required',
      // },
      // {
      //   $cmp: 'vue-tel-input',
      //   props: {
      //     mode: 'international',
      //   },
      // },
    ],
  },
  {
    $el: 'div',
    attrs: {
      class: 'my-map',
      id: 'map',
    },
  },
]
