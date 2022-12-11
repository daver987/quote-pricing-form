import { PrismaClient } from '@prisma/client'
import { ValidationSchema } from '~~/schema/quoteFormValues'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const cookies = parseCookies(event)
  const body = (await readBody(event)) as ValidationSchema

  const {
    email_address,
    first_name,
    last_name,
    phone,
    passenger_count,
    pick_up_date,
    pick_up_location,
    pick_up_time,
    drop_off_location,
    hours_required,
    service_type,
    vehicle_type,
  } = body
  const userData = { email_address, first_name, last_name, phone }
  const { hours, minutes } = pick_up_time
  const pickUpTime = `${hours}:${minutes}`
  const quoteData = {
    pick_up_location,
    drop_off_location,
    pick_up_date,
    pick_up_time: pickUpTime,
    service_type_value: service_type.value,
    service_type_label: service_type.label,
    vehicle_type_value: vehicle_type.value,
    vehicle_type_label: vehicle_type.label,
    passenger_count_value: passenger_count.value,
    passenger_count_label: passenger_count.label,
    hours_required_value: hours_required.value,
    hours_required_label: hours_required.label,
  }
  const createUser = await prisma.user.create({
    data: {
      ...userData,
      quotes: {
        create: [quoteData],
      },
    },
  })
  // const formSubmitResponse = await $fetch(
  //   'https://api.hsforms.com/submissions/v3/integration/submit/22137357/4ed8687b-6f59-41ec-aa5a-2cb340725209',
  //   {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: {
  //       body,
  //     },
  //   }
  // )
  return {
    // formSubmitResponse,
    body,
    createUser,
    statusCode: 200,
    cookies: {
      ...cookies,
    },
  }
})
