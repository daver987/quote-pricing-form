import * as zod from 'zod'
import { toFormValidator } from '@vee-validate/zod'

const formSchema = zod.object({
  pick_up_location: zod.string().min(1, 'Pick up location is required'),
  drop_off_location: zod.string().min(1, 'Drop off location is required'),
  pick_up_date: zod.date(),
  pick_up_time: zod.object({
    seconds: zod.number().min(0, 'Pick up time is required'),
    hours: zod.number().min(1, 'Pick up time is required'),
    minutes: zod.number(),
  }),
  service_type: zod.object({
    name: zod.string().min(1, 'Service type is required'),
    value: zod.number(),
  }),
  vehicle_type: zod.object({
    name: zod.string().min(1, 'Vehicle type is required'),
    value: zod.number(),
  }),
  passenger_count: zod.object({
    name: zod.string().min(1, 'Passengers is required'),
    value: zod.number(),
  }),
  hours_required: zod.object({
    name: zod.string().min(1, 'Hours required is required'),
    value: zod.number(),
  }),
  first_name: zod.string().min(1, 'First name is required'),
  last_name: zod.string().min(1, 'Last name is required'),
  email_address: zod
    .string()
    .min(1, 'Email is required')
    .email({ message: 'Must be a valid email' }),
  phone: zod
    .string()
    .min(1, 'This is required')
    .min(8, { message: 'Too short' }),
})

export const placeAutocompleteSchema = zod.object({
  origin: zod.object({
    place_id: zod.string().min(1, 'Origin place id is required'),
  }),
  destination: zod.object({
    place_id: zod.string().min(1, 'Origin place id is required'),
  }),
})

export const validationSchema = toFormValidator(formSchema)

export type ValidationSchema = zod.infer<typeof formSchema>
export type PlaceAutocompleteSchema = zod.infer<typeof placeAutocompleteSchema>
