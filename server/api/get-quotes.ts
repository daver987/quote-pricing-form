import { serverSupabaseClient } from '#supabase/server'
import { Database } from '~/types/supabase'

export default defineEventHandler(async (event) => {
  const supabase = serverSupabaseClient<Database>(event)
  const { data } = await supabase.from('quotes').select()
  return data
})
