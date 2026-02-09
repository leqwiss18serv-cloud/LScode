import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://cxeqsbortlvqkfqzphom.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_1M3Vc9WmTbtzqIO7ACcKLA_ZecYDgT2'

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Ошибка: Не установлены переменные окружения VITE_SUPABASE_URL и VITE_SUPABASE_ANON_KEY')
  console.error('Пожалуйста, создайте файл .env и добавьте необходимые переменные окружения')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
