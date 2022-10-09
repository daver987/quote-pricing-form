// noinspection JSUnusedGlobalSymbols
export default defineEventHandler(async (event) =>
  await $fetch(
    'https://hooks.zapier.com/hooks/catch/11745690/blbiy52/',
    {
      method: 'POST',
      body: await useBody(event),
    },
  ))
