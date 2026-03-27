import { createClient } from "@supabase/supabase-js";
import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// For client-side components (this can be imported by everyone)
export const createClientComponentClient = () => {
    if (!supabaseUrl || supabaseUrl === 'your_supabase_url') {
        return null as any;
    }
    return createBrowserClient(supabaseUrl, supabaseAnonKey);
};

// For server-side operations that bypass RLS (e.g. database seeds or complex admin logic)
export const createAdminClient = () => {
  return createClient(supabaseUrl, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
};
