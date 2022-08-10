import { hsFetch } from '~/composables/hsFetch'

export default defineEventHandler(async (event) => {
  const body = await useBody(event)
  const hsEndpoint = '/contacts'
  const createContactResponse = await hsFetch(hsEndpoint, body)
  return { createContactResponse }
})
