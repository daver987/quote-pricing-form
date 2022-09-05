import { defineEventHandler } from 'h3';

const surcharges = defineEventHandler(async (_event) => {
  return {
    fuelSurcharge: 0.08,
    gratuity: 0.2,
    HST: 0.13
  };
});

export { surcharges as default };
//# sourceMappingURL=surcharges.mjs.map
