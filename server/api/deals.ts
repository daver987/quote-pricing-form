import { hsFetch } from '~/composables/hsFetch'

export default defineEventHandler(async (event) => {
  const body = await useBody(event)
  const hsEndpoint = '/deals'
  const secret = useRuntimeConfig().apiSecret
  const createDealResponse = await hsFetch(hsEndpoint, body, secret)
  return { createDealResponse }
})
