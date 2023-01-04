import { z } from 'zod'

export const submittedSchema = z
  .object({
    data: z.object({
      calculatedDistance: z.number(),
      emailAddress: z.string(),
      firstName: z.string(),
      isItHourly: z.boolean(),
      isRoundTrip: z.boolean(),
      lastName: z.string(),
      phoneNumber: z.string(),
      pickupDate: z.string(),
      pickupTime: z.string(),
      placeDataDestination: z.object({
        formatted_address: z.string(),
        name: z.string(),
        place_id: z.string(),
      }),
      placeDataOrigin: z.object({
        formatted_address: z.string(),
        name: z.string(),
        place_id: z.string(),
      }),
      returnPickupDate: z.string(),
      returnPickupTime: z.string(),
      selectedNumberOfHours: z.object({ label: z.string(), value: z.number() }),
      selectedPassengers: z.object({ label: z.string(), value: z.number() }),
      selectedServiceType: z.object({ label: z.string(), value: z.number() }),
      selectedVehicleType: z.object({ label: z.string(), value: z.number() }),
      tripData: z.object({
        distanceText: z.string(),
        distanceValue: z.number(),
        durationText: z.string(),
        durationValue: z.number(),
        endLat: z.number(),
        endLng: z.number(),
        startLat: z.number(),
        startLng: z.number(),
      }),
    }),
    success: z.boolean(),
  })
  .strip()

export type SubmittedSchema = z.infer<typeof submittedSchema>
