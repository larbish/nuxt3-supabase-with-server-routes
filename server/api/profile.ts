import { serverSupabaseUser } from '#supabase/server';

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event);
  if (!user) {
    throw new Error('Not authorized');
  }

  return user
});