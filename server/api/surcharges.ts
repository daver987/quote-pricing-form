//surcharge data model on the server
export default defineEventHandler(async (_event) => {
  return {
    fuelSurcharge: 0.08,
    gratuity: 0.2,
    HST: 0.13,
  }
})
