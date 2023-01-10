import { Directions } from '~/types/Directions'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const { origin, destination } = query
  const response = await $fetch<Directions>(
    `https://maps.googleapis.com/maps/api/directions/json?origin=place_id:${origin}&destination=place_id:${destination}&key=AIzaSyDJJhVTuoRoXVJA6VvmltFvUCIqvVpRZSA
      `,
    {
      method: 'POST',
    }
  )
  const { value: distanceValue, text: distanceText } =
    response.routes[0].legs[0].distance
  const { value: durationValue, text: durationText } =
    response.routes[0].legs[0].duration
  const { lat: startLat, lng: startLng } =
    response.routes[0].legs[0].start_location
  const { lat: endLat, lng: endLng } = response.routes[0].legs[0].end_location
  return {
    distanceValue,
    distanceText,
    durationValue,
    durationText,
    startLat,
    startLng,
    endLat,
    endLng,
  }
})
