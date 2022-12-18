import ip from 'ip'

export default defineEventHandler(async (event) => {
  const ipAddress = ip.address()
  const body = await readBody(event)
  const cookies = parseCookies(event)
  const { hubspotutk: hutk } = cookies
  body.context = { hutk, ipAddress }
  const response = await $fetch(
    'https://api.hsforms.com/submissions/v3/integration/submit/22137357/ffb7e665-051f-414d-a036-9dc281a5efdf',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }
  )
  return { response, cookies, body }
})
