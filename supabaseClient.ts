import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ujnvsgvsvkjleunqvlzt.supabase.co';
const supabaseAnonKey = 'sb_publishable_5RwKiAq3_2vuQWsQMnXt-g_8PJ5W6ol';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);