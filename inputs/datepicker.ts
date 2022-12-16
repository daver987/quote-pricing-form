import Datepicker from '@vuepic/vue-datepicker'
import { createInput } from '@formkit/vue'

const datepickerSchema = [
  {
    $cmp: 'Datepicker',
  },
]

export default createInput(datepickerSchema, {
  features: [],
})
