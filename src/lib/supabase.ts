import { createClient } from '@supabase/supabase-js';

// These environment variables need to be set in your .env file
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables. Please check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper function to get user role from Supabase metadata
export const getUserRole = async (userId: string): Promise<'admin' | 'client' | 'support' | null> => {
  try {
    // First check if user has a role in user_roles table
    const { data: roleData, error: roleError } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId)
      .single();

    if (roleError) {
      console.error('Error fetching user role:', roleError);
      return null;
    }

    if (roleData?.role) {
      return roleData.role as 'admin' | 'client' | 'support';
    }

    // If no role found, default to client
    return 'client';
  } catch (error) {
    console.error('Error in getUserRole:', error);
    return null;
  }
}; 