import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
const serviceRoleKey = process.env.NEXT_PUBLIC_SUPABASE_ROLE_KEY ?? ''
const supabase = createClient<Database>(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

export const adminAuthClient = supabase.auth.admin
