import { createClient } from "@supabase/supabase-js";
import { createBrowserClient, createServerClient, type CookieOptions } from "@supabase/ssr";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2MjI0OTYwMDAsImV4cCI6MjI1MzkzMjAwMH0.dummy-signature';

// For client-side components
export const createClientComponentClient = () => {
    return createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY);
};

// For server-side operations (Server Components, API Routes, Server Actions)
export const createServerSupabaseClient = (cookieStore: any) => {
  return createServerClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (error) {
            // Handle edge cases where cookies might not be settable (e.g. middleware)
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options });
          } catch (error) {
            // Handle edge cases
          }
        },
      },
    }
  );
};

// For server-side operations that bypass RLS (Admin logic)
export const createAdminClient = () => {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!SUPABASE_URL || !serviceRoleKey) {
    if (process.env.NODE_ENV === 'production') {
        console.error("Missing Supabase environment variables");
        return null as any;
    }
    // Fallback for build/development if not critical
    return createClient(SUPABASE_URL, 'placeholder-role-key');
  }

  return createClient(SUPABASE_URL, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
};
