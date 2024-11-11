import { createClient } from '@supabase/supabase-js'
import type { Database } from './database.types'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file')
}

export const supabase = createClient<Database>(supabaseUrl, supabaseKey)

export const checkSupabaseConnection = async () => {
  try {
    const { data, error } = await supabase.from('bookings').select('count').single()
    if (error) throw error
    console.log('Successfully connected to Supabase')
    return true
  } catch (error) {
    console.error('Error connecting to Supabase:', error)
    return false
  }
}