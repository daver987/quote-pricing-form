const baseURL = 'api.hubapi.com'
const basePath = '/crm/v3/objects'
const url = `https://${baseURL}${basePath}`

// interface for the response from the hubspot API
export interface CreateContactResponse {
  createContactResponse: {
    archived: boolean
    createdAt: string
    id: string
    properties: {
      createdate: string
      email: string
      firstname: string
      hs_all_contact_vids: string
      hs_calculated_phone_number: string
      hs_calculated_phone_number_country_code: string
      hs_email_domain: string
      hs_is_contact_unsubscribed: string
      hs_is_unworked_contact: string
      hs_lifecyclestage_lead_date: string
      hs_marketable_status: string
      hs_marketable_until_renewal: string
      hs_object_id: string
      hs_pipeline: string
      hs_searchable_calculated_phone_number: string
      lastmodifieddate: string
      lastname: string
      lifecyclestage: string
      phone: string
    }
    updatedAt: string
  }
}

export interface CreateDealResponse {
  createDealResponse: {
    archived: boolean
    createdAt: string
    id: string
    properties: {
      amount: string
      amount_in_home_currency: string
      createdate: string
      days_to_close: string
      dealname: string
      dealstage: string
      dealtype: string
      hs_all_owner_ids: string
      hs_closed_amount: string
      hs_closed_amount_in_home_currency: string
      hs_createdate: string
      hs_deal_stage_probability_shadow: string
      hs_forecast_amount: string
      hs_is_closed: string
      hs_is_closed_won: string
      hs_is_deal_split: string
      hs_lastmodifieddate: string
      hs_object_id: string
      hs_projected_amount: string
      hs_projected_amount_in_home_currency: string
      hs_user_ids_of_all_owners: string
      hubspot_owner_assigneddate: string
      hubspot_owner_id: string
      pipeline: string
    }
    updatedAt: string
  }
}

// @ts-ignore
const hsFetch = async (hsEndPoint: string, hsBody: object, secret: string) => {
  return await $fetch(url + hsEndPoint, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: 'Bearer ' + secret,
    },
    body: hsBody,
  })
}

// const secret = useRuntimeConfig().apiSecret
// const hsFetchAssociate = (dealId: string, toObjectId: string) => {
//   return $fetch(
//     `https://api.hubapi.com/crm/v3/objects/deals/${dealId}/associations/contact/${toObjectId}/deal_to_contact`,
//     {
//       method: 'PUT',
//       headers: {
//         authorization: 'Bearer ' + secret,
//       },
//     }
//   )
// }

export { hsFetch }
// const myForm = ref(null)
// onMounted(() => {
//   console.dir(myForm)
// })
//
// const rules = {
//   origin_input: {
//     required,
//     minLength: minLength(3),
//   },
//   destination_input: {
//     required,
//     minLength: minLength(3),
//   },
//   pickup_date: {
//     required,
//   },
//   pickup_time: {
//     required,
//   },
//   service_type: {
//     required,
//   },
//   num_passengers: {
//     required,
//   },
//   vehicle_type: {
//     required,
//   },
//   first_name: {
//     required,
//     minLength: minLength(3),
//   },
//   last_name: {
//     required,
//     minLength: minLength(3),
//   },
//   email_address: {
//     required,
//     email,
//   },
//   phone_number: {
//     required,
//   },
// }
// const state = reactive({
//   origin_input: origin_location.value,
//   destination_input: destination_location.value,
//   pickup_date: pickup_date.value,
//   pickup_time: pickup_time.value,
//   service_type: service_type.value,
//   num_passengers: num_passengers.value,
//   vehicle_type: vehicle_type.value,
//   first_name: first_name.value,
//   last_name: last_name.value,
//   email_address: email_address.value,
//   phone_number: phone_number.value,
// })
// const v$ = useVuelidate(rules, state)
// console.log(v$)
