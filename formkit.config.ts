import {
  close,
  down,
  fileDoc,
  check,
  circle,
  spinner,
  star,
  trash,
  add,
  arrowUp,
  arrowDown,
} from '@formkit/icons'
import { DefaultConfigOptions } from '@formkit/vue'
import { createProPlugin, inputs } from '@formkit/pro'
import stepNumber from './inputs/stepNumber'
import placesAutocomplete from './inputs/placesAutocomplete'
import telInput from './inputs/telInput'
import datepicker from './inputs/datepicker'

const pro = createProPlugin('fk-9130a82cc0', inputs)

const config: DefaultConfigOptions = {
  inputs: {
    stepNumber,
    placesAutocomplete,
    telInput,
    datepicker,
  },
  plugins: [pro],
  icons: {
    close,
    down,
    fileDoc,
    check,
    circle,
    spinner,
    star,
    trash,
    add,
    arrowUp,
    arrowDown,
    checkboxDecorator: check,
  },
}

export default config
