'use server';

import { createClient } from '@/lib/supabase/server';

export async function sendMagicLink(email: string): Promise<{ error: string | null }> {
  const supabase = await createClient();

  const redirectTo = `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`;

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: redirectTo,
    },
  });

  if (error) {
    return { error: error.message };
  }

  return { error: null };
}
