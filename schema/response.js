export const response = [
  {
    rate: {
      id: 1,
      name: 'Standard Sedan',
      per_km: 1.7,
      per_hour: 80,
      min_hours_hourly: 2,
      min_rate_distance: 80,
      min_distance: 25,
      min_rate_hourly: 160,
    },
    statusCode: 200,
    body: {
      pickupDate: '2022-12-21',
      pickupTime: '00:40',
      serviceType: {
        label: 'Point-to-Point',
        value: 1,
      },
      vehicleType: {
        label: 'Standard Sedan',
        value: 1,
      },
      numberOfHours: {
        label: 'For Hourly Service',
        value: 0,
      },
      passengers: {
        label: '1 passenger',
        value: 1,
      },
      firstName: 'David',
      lastName: 'Robertson',
      emailAddress: 'you@me.com',
      phoneNumber: '+1 289-444-8765',
      isRoundTrip: false,
      isHourly: false,
      tripData: {
        distanceValue: 35879,
        distanceText: '35.9 km',
        durationValue: 1481,
        durationText: '25 mins',
        startLat: 43.6858094,
        startLng: -79.6041328,
        endLat: 43.4599963,
        endLng: -79.7023802,
      },
      originData: {
        formatted_address:
          '6301 Silver Dart Dr, Mississauga, ON L5P 1B2, Canada',
        name: 'Toronto Pearson International Airport',
        place_id: 'ChIJkdQtwEo5K4gRxQ4DxOldHbQ',
      },
      destinationData: {
        formatted_address: '1265 Sixth Line, Oakville, ON L6H 1X2, Canada',
        name: '1265 Sixth Line',
        place_id: 'ChIJL2VACCJdK4gRNSEzAPRTYs4',
      },
    },
    firstName: 'David',
    lastName: 'Robertson',
    emailAddress: 'you@me.com',
    phoneNumber: '+1 289-444-8765',
    fuelSurcharge: null,
    gratuity: null,
    HST: null,
    baseRate: 61031.8,
    isHourly: false,
    hours: 0,
    distanceValue: 35879,
  },
]