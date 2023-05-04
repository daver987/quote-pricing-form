export default defineEventHandler(async (event) => {
  const prisma = event.context.prisma
  const data = await prisma.quote.findMany({
    include: {
      trips: true,
      user: true,
      pricing: true,
    },
  })
  console.log('fetched quotes', data)
  return data
})
