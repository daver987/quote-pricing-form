const baseURL = 'api.hubapi.com'
const basePath = '/crm/v3/objects'
const url = `https://${baseURL}${basePath}`

// @ts-ignore
const hsFetch = (hsEndPoint: string, hsBody: object, secret: string) => {
  return $fetch.raw(url + hsEndPoint, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: 'Bearer ' + secret,
    },
    body: hsBody,
  })
}

const hsFetchAssociate = (
  dealId: string,
  toObjectId: string,
  secret: string
) => {
  return $fetch(
    `https://api.hubapi.com/crm/v3/objects/deals/${dealId}/associations/contact/${toObjectId}/deal_to_contact`,
    {
      method: 'PUT',
      headers: {
        authorization: 'Bearer ' + secret,
      },
    }
  )
}

export { hsFetch, hsFetchAssociate }
