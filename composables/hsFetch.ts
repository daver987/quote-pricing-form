const baseURL = 'api.hubapi.com'
const basePath = '/crm/v3/objects'
const url = `https://${baseURL}${basePath}`

// @ts-ignore
const hsFetch = (hsEndPoint: string, hsBody: object, secret: string) => {
  return $fetch(url + hsEndPoint, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: 'Bearer ' + secret,
    },
    body: hsBody,
  })
}

export { hsFetch }
