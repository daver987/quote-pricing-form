import { z } from 'zod'

export const formSchema = z.object({
  pickupDate: z.string(),
  pickupTime: z.string(),
  selectedServiceType: z.object({
    label: z.string(),
    value: z.number(),
    isDisabled: z.boolean(),
  }),
  selectedVehicleType: z.object({
    label: z.string(),
    value: z.number(),
    isDisabled: z.boolean(),
  }),
  selectedNumberOfHours: z.object({
    label: z.string(),
    value: z.number(),
    isDisabled: z.boolean(),
  }),
  selectedPassengers: z.object({
    label: z.string(),
    value: z.number(),
    isDisabled: z.boolean(),
  }),
  firstName: z.string(),
  lastName: z.string(),
  emailAddress: z.string().email(),
  phoneNumber: z.string(),
  isRoundTrip: z.boolean(),
  isHourly: z.boolean(),
  tripData: z.object({
    distanceValue: z.number(),
    distanceText: z.string(),
    durationValue: z.number(),
    durationText: z.string(),
    startLat: z.number(),
    startLng: z.number(),
    endLat: z.number(),
    endLng: z.number(),
  }),
  originData: z.object({
    formatted_address: z.string(),
    name: z.string(),
    place_id: z.string(),
  }),
  destinationData: z.object({
    formatted_address: z.string(),
    name: z.string(),
    place_id: z.string(),
  }),
  calculatedDistance: z.number(),
})

export type ValidationSchema = z.infer<typeof formSchema>
