// src/lib/supabaseClient.js
import { createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';

// IMPORTANT: This only works if you have created the .env file in the root
// and populated PUBLIC_SUPABASE_URL and PUBLIC_SUPABASE_ANON_KEY.

export const supabase = createClient(
  PUBLIC_SUPABASE_URL,
  PUBLIC_SUPABASE_ANON_KEY
);