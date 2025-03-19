
import React, { createContext, useState, useContext, useEffect } from 'react';
import { User, AuthContextType } from '@/lib/auth-types';
import { supabase, getUserRole } from '@/lib/supabase';
import { Session, User as SupabaseUser } from '@supabase/supabase-js';

// Default context state
const defaultContext: AuthContextType = {
  user: null,
  isAuthenticated: false,
  isLoading: true,  // Added this line
  login: async () => null,
  logout: async () => {},
  register: async () => {},
  loading: true,    // Keeping this for backward compatibility
  getAllUsers: async () => [],
  createUser: async () => ({ id: '', email: '', name: '', role: 'client' }),
  updateUser: async () => ({ id: '', email: '', name: '', role: 'client' }),
  deleteUser: async () => {},
};

// Create auth context
const AuthContext = createContext<AuthContextType>(defaultContext);

// Define sample users for testing (keeping this for fallback)
const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@example.com',
    name: 'Admin User',
    role: 'admin',
    department: 'IT',
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    email: 'support@example.com',
    name: 'Support Agent',
    role: 'support',
    department: 'Customer Service',
    created_at: new Date().toISOString(),
  },
  {
    id: '3',
    email: 'client@example.com',
    name: 'Client User',
    role: 'client',
    created_at: new Date().toISOString(),
  },
];

// Helper function to transform Supabase user to our User type
const transformUser = async (supabaseUser: SupabaseUser | null): Promise<User | null> => {
  if (!supabaseUser) return null;
  
  try {
    // Get user role from our helper function
    const role = await getUserRole(supabaseUser.id);
    
    // Get user profile data from profiles table
    const { data: profile } = await supabase
      .from('profiles')
      .select('name, department')
      .eq('id', supabaseUser.id)
      .single();
    
    return {
      id: supabaseUser.id,
      email: supabaseUser.email || '',
      name: profile?.name || supabaseUser.email?.split('@')[0] || '',
      role: role || 'client',
      department: profile?.department,
      created_at: supabaseUser.created_at,
    };
  } catch (error) {
    console.error('Error transforming user:', error);
    return null;
  }
};

// Auth provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const isAuthenticated = !!user;

  // Check for stored authentication on component mount
  useEffect(() => {
    const initializeAuth = async () => {
      setLoading(true);
      
      try {
        // First try to get from localStorage for backward compatibility
        const storedUser = localStorage.getItem('user');
        
        if (storedUser) {
          try {
            setUser(JSON.parse(storedUser));
            setLoading(false);
            return;
          } catch (e) {
            console.error('Failed to parse stored user:', e);
            localStorage.removeItem('user');
          }
        }
        
        // If no stored user, try Supabase session
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          const transformedUser = await transformUser(session.user);
          if (transformedUser) {
            setUser(transformedUser);
            localStorage.setItem('user', JSON.stringify(transformedUser));
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        setLoading(false);
      }
    };
    
    initializeAuth();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // For demo/testing purposes, allow login with mock users
      if (password === 'password') {
        const mockUser = mockUsers.find(u => u.email === email);
        if (mockUser) {
          setUser(mockUser);
          localStorage.setItem('user', JSON.stringify(mockUser));
          return mockUser;
        }
      }
      
      // Try Supabase login
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      const transformedUser = await transformUser(data.user);
      if (transformedUser) {
        setUser(transformedUser);
        localStorage.setItem('user', JSON.stringify(transformedUser));
      }
      
      return transformedUser;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    setLoading(true);
    try {
      // Try Supabase logout
      await supabase.auth.signOut();
      
      // Clear user state and local storage
      setUser(null);
      localStorage.removeItem('user');
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (email: string, password: string, name: string, role: string, department?: string) => {
    setLoading(true);
    try {
      // Register user with Supabase
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            role,
            department
          }
        }
      });
      
      if (error) throw error;
      
      if (data.user) {
        try {
          // Create profile entry
          const { error: profileError } = await supabase
            .from('profiles')
            .insert({
              id: data.user.id,
              name,
              department,
            });
          
          if (profileError) console.error('Profile creation error:', profileError);
          
          // Create role entry
          const { error: roleError } = await supabase
            .from('user_roles')
            .insert({
              user_id: data.user.id,
              role: role as 'admin' | 'client' | 'support',
            });
          
          if (roleError) console.error('Role assignment error:', roleError);
        } catch (err) {
          console.error('Error creating user profile/role:', err);
        }
        
        // For backward compatibility, create a user object and store it
        const newUser: User = {
          id: data.user.id,
          email,
          name,
          role: role as 'admin' | 'client' | 'support',
          department,
          created_at: new Date().toISOString(),
        };
        
        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser));
      }
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Get all users
  const getAllUsers = async (): Promise<User[]> => {
    // For backward compatibility, return mock users
    return [...mockUsers];
  };

  // Create a new user
  const createUser = async (userData: Partial<User>): Promise<User> => {
    // For backward compatibility, create a mock user
    const newUser: User = {
      id: (mockUsers.length + 1).toString(),
      email: userData.email || '',
      name: userData.name || '',
      role: userData.role || 'client',
      department: userData.department,
      created_at: new Date().toISOString(),
    };
    
    mockUsers.push(newUser);
    return newUser;
  };

  // Update a user
  const updateUser = async (id: string, userData: Partial<User>): Promise<User> => {
    // For backward compatibility, update a mock user
    const userIndex = mockUsers.findIndex(u => u.id === id);
    
    if (userIndex === -1) {
      throw new Error('User not found');
    }
    
    const updatedUser = {...mockUsers[userIndex], ...userData};
    mockUsers[userIndex] = updatedUser;
    
    // If updating the current user, update state
    if (user && user.id === id) {
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
    
    return updatedUser;
  };

  // Delete a user
  const deleteUser = async (id: string): Promise<void> => {
    // For backward compatibility, delete a mock user
    const userIndex = mockUsers.findIndex(u => u.id === id);
    
    if (userIndex === -1) {
      throw new Error('User not found');
    }
    
    mockUsers.splice(userIndex, 1);
  };

  // Context value
  const value = {
    user,
    isAuthenticated,
    isLoading: loading, // Added this line to map loading to isLoading
    login,
    logout,
    register,
    loading,
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);
