import { hsFetch } from '~/composables/hsFetch'
import { CreateContactResponse } from '~/composables/hsFetch'

export default defineEventHandler(async (event) => {
  const secret = useRuntimeConfig().apiSecret
  const body = await useBody(event)
  const hsEndpoint = '/contacts'
  const createContactResponse = await hsFetch(hsEndpoint, body, secret)
  return { createContactResponse } as CreateContactResponse
})
