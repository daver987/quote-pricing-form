import { z } from 'zod'

export const formSchema = z.object({
  pickupDate: z.string().min(1),
  pickupTime: z.string().min(1),
  returnPickupDate: z.string().default('00-00-0000'),
  returnPickupTime: z.string().default('00:00'),
  selectedServiceType: z
    .object({
      label: z.enum([
        'Point To Point',
        'From Airport',
        'To Airport',
        'Hourly / As Directed',
      ]),
      value: z.number().int().gte(1).lte(4),
    })
    .strip(),
  selectedVehicleType: z
    .object({
      label: z.enum([
        'Standard Sedan',
        'Premium Sedan',
        'Standard SUV',
        'Premium SUV',
      ]),
      value: z.number().int().gte(1).lte(4),
    })
    .strip(),
  selectedNumberOfHours: z
    .object({
      label: z
        .enum([
          'For Hourly Service',
          '2 hrs',
          '3 hrs',
          '4 hrs',
          '5 hrs',
          '6 hrs',
          '7 hrs',
          '8 hrs',
          '9 hrs',
          '10 hrs',
          '11 hrs',
          '12 hrs',
        ])
        .optional(),
      value: z.number().int().gte(0).lte(12).optional(),
    })
    .strip()
    .optional(),
  selectedPassengers: z
    .object({
      label: z.enum([
        '1 Passenger',
        '2 Passengers',
        '3 Passengers',
        '4 Passengers',
        '5 Passengers',
        '6 Passengers',
        '7 Passengers',
      ]),
      value: z.number().int().gte(1).lte(7),
    })
    .strip(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  emailAddress: z.string().email(),
  phoneNumber: z.string().min(7),
  isRoundTrip: z.boolean(),
  isItHourly: z.boolean(),
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
  placeDataOrigin: z
    .object({
      formatted_address: z.string(),
      name: z.string(),
      place_id: z.string(),
    })
    .strip(),
  placeDataDestination: z
    .object({
      formatted_address: z.string(),
      name: z.string(),
      place_id: z.string(),
    })
    .strip(),
  calculatedDistance: z.number(),
})

export type ValidationSchema = z.infer<typeof formSchema>
