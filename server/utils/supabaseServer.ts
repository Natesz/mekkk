import { createClient, type SupabaseClient } from '@supabase/supabase-js'

export function useSupabaseServer(): SupabaseClient {
  const config = useRuntimeConfig()
  return createClient(
    config.public.supabaseUrl as string,
    config.supabaseServiceRoleKey as string,
  )
}
