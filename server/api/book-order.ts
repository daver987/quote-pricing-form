import { serverSupabaseClient } from '#supabase/server'
import { Database } from '~/types/supabase'

const webhookUrl = useRuntimeConfig().ZAPIER_WEBHOOK_BOOK_ORDER

export default defineEventHandler(async (event) => {
  const supabase = serverSupabaseClient<Database>(event)
  const body = await readBody(event)

  const getVehicleType = async () => {
    const { data: vehicleType } = await supabase
      .from('vehicle_type')
      .select('*')
      .eq('value', body.vehicleTypeValue)
    await console.log('This is the Vehicle Type', vehicleType)
    return vehicleType
  }
  const vehicleType = await getVehicleType()
  body.la_vehicle_type_id = vehicleType?.filter(
    (type) => type.id === body.vehicleTypeValue
  )[0].limo_anywhere_id

  const getServiceType = async () => {
    const { data: serviceType } = await supabase
      .from('service_type')
      .select('*')
      .eq('value', body.serviceTypeValue)
    await console.log('This is the Service Type', serviceType)
    return serviceType
  }
  const serviceType = await getServiceType()
  body.la_service_type_id = serviceType?.filter(
    (type) => type.id === body.serviceTypeValue
  )[0].limo_anywhere_id

  const setIsBooked = async () => {
    const { data, error } = await supabase
      .from('quotes')
      .update({ isBooked: true })
      .eq('id', body.id)
      .select()
    await console.log('This is the data', data, 'This is the error', error)
  }
  await setIsBooked()

  await console.log('This is the body', body)

  const response = await $fetch(webhookUrl, {
    method: 'POST',
    body: body,
  })
  await console.log('Zapier webhook response', response)
  return response
})
