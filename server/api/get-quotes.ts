import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const supabase = serverSupabaseClient(event)
  const { data, error } = await supabase.from('quotes').select()
  return data
})
