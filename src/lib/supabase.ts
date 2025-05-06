import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase URL or Anon Key is missing. Please check your environment variables.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Function to add an email to the waitlist
export async function addToWaitlist(email: string) {
  try {
    const { data, error } = await supabase
      .from('waitlist')
      .insert([{ email, created_at: new Date().toISOString() }]);
    
    if (error) {
      console.error('Error adding to waitlist:', error);
      throw error;
    }
    
    return { success: true, data };
  } catch (error) {
    console.error('Error in addToWaitlist function:', error);
    return { success: false, error };
  }
}
