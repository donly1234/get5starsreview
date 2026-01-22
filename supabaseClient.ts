import { createClient } from '@supabase/supabase-js';

/**
 * 🛠️ IMPORTANT: TO FIX THE GOOGLE AUTH "LONG LETTERS" ISSUE (App Name):
 * 1. Go to https://console.cloud.google.com/
 * 2. Select your project: "ujnvsgvsvkjleunqvlzt"
 * 3. Go to "APIs & Services" > "OAuth consent screen"
 * 4. Set "App name" to "Get5StarsReview"
 * 5. Add your logo and support email.
 * 6. Save and publish. 
 * This will replace the .supabase.co URL with your brand name in the Google login screen.
 */

const supabaseUrl = 'https://ujnvsgvsvkjleunqvlzt.supabase.co';
const supabaseAnonKey = 'sb_publishable_5RwKiAq3_2vuQWsQMnXt-g_8PJ5W6ol';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
});
