export default defineEventHandler(async (event) => {
  const formBody = await useBody(event)
  const formSubmitResponse = await $fetch(
    'https://api.hsforms.com/submissions/v3/integration/submit/22137357/4ed8687b-6f59-41ec-aa5a-2cb340725209',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: formBody,
    }
  )
  return { formSubmitResponse }
})
