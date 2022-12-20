import { ValidationSchema } from '~/schema/quoteFormValues'

export default defineEventHandler(async (event) => {
  const body = await readBody<ValidationSchema>(event)
  const { firstName, lastName, emailAddress, phoneNumber } = body
  return {
    statusCode: 200,
    body,
    firstName,
    lastName,
    emailAddress,
    phoneNumber,
  }
})
