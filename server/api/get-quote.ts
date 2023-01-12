import { serverSupabaseClient } from '#supabase/server'
export default defineEventHandler(async (event) => {
  const client = serverSupabaseClient(event)
  const { data } = await client.from('quotes').select()
  return { quotes: data }
})
