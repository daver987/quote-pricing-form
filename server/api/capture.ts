export default defineEventHandler(async (event) => {
  const body = await useBody(event);
  const useZap = await $fetch(
    "https://hooks.zapier.com/hooks/catch/11745690/blbiy52/",
    {
      method: "POST",
      body: { body }
    }
  );
  console.log(useZap);
  return useZap;
});
