import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
const supabase = createClient(
  "https://huilijzvdcngwenwfimd.supabase.co",
  import.meta.env.VITE_SUPABASE_API_KEY
);

export default supabase;
