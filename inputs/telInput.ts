import { VueTelInput } from 'vue-tel-input'
import { createInput } from '@formkit/vue'

const telInput = () => VueTelInput

const telInputSchema = [
  {
    $cmp: 'telInput',
  },
]

export default createInput(telInputSchema, {
  features: [],
})
