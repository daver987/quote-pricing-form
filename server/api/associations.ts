export default defineEventHandler(async (event) => {
  const secret = useRuntimeConfig().apiSecret
  const request = await useBody(event.req)
  console.log(request)
  const associations = await $fetch(request, {
    method: 'PUT',
    headers: {
      authorization: 'Bearer ' + secret,
    },
  })
  return { associations }
})
