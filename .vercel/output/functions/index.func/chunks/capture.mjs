import { defineEventHandler, useBody } from 'h3';

const capture = defineEventHandler(async (event) => {
  return await $fetch(
    "https://hooks.zapier.com/hooks/catch/11745690/blbiy52/",
    {
      method: "POST",
      body: await useBody(event)
    }
  );
});

export { capture as default };
//# sourceMappingURL=capture.mjs.map
