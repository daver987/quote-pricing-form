export default defineEventHandler(async (event) => {
  return await $fetch(
    'https://hooks.zapier.com/hooks/catch/11745690/bqv9kqq/',
    {
      method: 'POST',
      body: await useBody(event),
    }
  )
})
