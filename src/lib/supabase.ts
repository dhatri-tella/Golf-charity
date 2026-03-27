import { createClient } from "@supabase/supabase-js";
import { createBrowserClient } from "@supabase/ssr";

// For client-side components (this can be imported by everyone)
export const createClientComponentClient = () => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2MjI0OTYwMDAsImV4cCI6MjI1MzkzMjAwMH0.dummy-signature';
    
    return createBrowserClient(supabaseUrl, supabaseAnonKey);
};

// For server-side operations that bypass RLS (e.g. database seeds or complex admin logic)
export const createAdminClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    console.error("Missing Supabase environment variables");
    return null as any;
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
};
