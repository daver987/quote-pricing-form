import * as zod from 'zod'
import { toFormValidator } from '@vee-validate/zod'

const formSchema = zod.object({
  pick_up_location: zod.string().min(1, 'Pick up location is required'),
  drop_off_location: zod.string().min(1, 'Drop off location is required'),
  pickupDate: zod.string().min(1, 'Pick up date is required'),
  pickupTime: zod.string().min(1, 'Pick up time is required'),
  selectedServiceType: zod.object({
    label: zod.string().min(1, 'Service type is required'),
    value: zod.number(),
  }),
  selectedVehicleType: zod.object({
    label: zod.string().min(1, 'Vehicle type is required'),
    value: zod.number(),
  }),
  selectedPassengers: zod.object({
    label: zod.string().min(1, 'Passengers is required'),
    value: zod.number(),
  }),
  selectedNumberOfHours: zod.object({
    label: zod.string().min(1, 'Hours required is required'),
    value: zod.string(),
  }),
  firstName: zod.string().min(1, 'First name is required'),
  lastName: zod.string().min(1, 'Last name is required'),
  emailAddress: zod
    .string()
    .min(1, 'Email is required')
    .email({ message: 'Must be a valid email' }),
  phoneNumber: zod
    .string()
    .min(1, 'This is required')
    .min(8, { message: 'Too short' }),
  isRoundTrip: zod.boolean(),
  isItHourly: zod.boolean(),
  tripData: zod.object({
    distanceValue: zod.number(),
    distanceText: zod.string(),
    durationValue: zod.number(),
    durationText: zod.string(),
    startLat: zod.number(),
    startLng: zod.number(),
    endLat: zod.number(),
    endLng: zod.number(),
  }),
  placeDataOrigin: zod.object({
    place_id: zod.string(),
    formatted_address: zod.string(),
    name: zod.string(),
  }),
  placeDataDestination: zod.object({
    place_id: zod.string(),
    formatted_address: zod.string(),
    name: zod.string(),
  }),
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
