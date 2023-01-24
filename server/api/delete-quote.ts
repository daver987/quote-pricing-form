import { serverSupabaseClient } from '#supabase/server'
import { Database } from '~/types/supabase'

export default defineEventHandler(async (event) => {
  const supabase = serverSupabaseClient<Database>(event)
  const body = await readBody(event)
  const { data, error } = await supabase
    .from('quotes')
    .delete()
    .eq('id', body.id)
    .select()
  return data
})
