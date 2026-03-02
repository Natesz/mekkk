import { createClient, type SupabaseClient } from '@supabase/supabase-js'

export function useSupabaseServer(): SupabaseClient {
  const config = useRuntimeConfig()
  const url = config.public.supabaseUrl as string
  const key = (config.supabaseServiceRoleKey as string)
    || process.env.NUXT_SUPABASE_SERVICE_ROLE_KEY
    || process.env.SUPABASE_SERVICE_ROLE_KEY
    || (config.public.supabaseAnonKey as string)
  return createClient(url, key)
}
