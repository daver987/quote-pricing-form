//options for the various form components
export default defineEventHandler((_event) => {
  return [
    [
      {
        label: '1 passenger',
        value: 1,
      },
      {
        label: '2 passengers',
        value: 2,
      },
      {
        label: '3 passengers',
        value: 3,
      },
      {
        label: '4 passengers',
        value: 4,
      },
      {
        label: '5 passengers',
        value: 5,
      },
      {
        label: '6 passengers',
        value: 6,
      },
      {
        label: '7 passengers',
        value: 7,
      },
    ],
    [
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

    [
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
  ]
})
