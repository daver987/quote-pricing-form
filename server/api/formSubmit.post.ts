import ip from 'ip'
// noinspection JSUnusedGlobalSymbols
export default defineEventHandler(async (event) => {
  const ipAddress = ip.address()
  const body = await useBody(event)
  const cookies = parseCookies(event)
  const { hubspotutk: hutk } = cookies
  body.context = { hutk, ipAddress }
  const response = await $fetch(
    'https://api.hsforms.com/submissions/v3/integration/submit/22137357/8fd8c57a-7df7-42ac-bf35-3025acaf1e10',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  )
  return { response, cookies, body }
})
