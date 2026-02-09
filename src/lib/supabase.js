import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Ошибка: Не установлены переменные окружения VITE_SUPABASE_URL и VITE_SUPABASE_ANON_KEY')
  console.error('Пожалуйста, создайте файл .env и добавьте необходимые переменные окружения')
}

// Fallback to default values if not set (for development)
const finalUrl = supabaseUrl || 'https://cxeqsbortlvqkfqzphom.supabase.co'
const finalKey = supabaseAnonKey || 'sb_publishable_1M3Vc9WmTbtzqIO7ACcKLA_ZecYDgT2'

export const supabase = createClient(finalUrl, finalKey)
