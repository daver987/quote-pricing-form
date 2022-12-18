export default defineEventHandler(async (event) => {
  return await $fetch(
    'https://hooks.zapier.com/hooks/catch/11745690/blbiy52/',
    {
      method: 'POST',
      body: await readBody(event),
    }
  )
})
