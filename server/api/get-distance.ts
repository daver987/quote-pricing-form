export default defineEventHandler(async (event) => {
  const query = useQuery(event)
  const { origin, destination } = query
  const config = useRuntimeConfig()
  const data = await $fetch(
    `https://maps.googleapis.com/maps/api/directions/json?origin=place_id:${origin}&destination=place_id:${destination}&key=${config.public.MAPS_API_KEY}`,
  )
  return { data }
})
