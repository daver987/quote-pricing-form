import { hsFetch } from '~/composables/hsFetch'
import { CreateDealResponse } from '~/composables/hsFetch'

export default defineEventHandler(async (event) => {
  const secret = useRuntimeConfig().apiSecret
  const body = await useBody(event)
  const hsEndpoint = '/deals'
  const createDealResponse = await hsFetch(hsEndpoint, body, secret)
  return { createDealResponse } as CreateDealResponse
})
