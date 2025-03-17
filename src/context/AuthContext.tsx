
import React, { createContext, useState, useContext, useEffect } from 'react';
import { User, AuthContextType } from '@/lib/auth-types';

// Default context state
const defaultContext: AuthContextType = {
  user: null,
  isAuthenticated: false, // Add this property
  login: async () => {},
  logout: async () => {},
  register: async () => {},
  loading: true,
  getAllUsers: async () => [],
  createUser: async () => ({ id: '', email: '', name: '', role: 'client' }),
  updateUser: async () => ({ id: '', email: '', name: '', role: 'client' }),
  deleteUser: async () => {},
};

// Create auth context
const AuthContext = createContext<AuthContextType>(defaultContext);

// Define sample users for testing
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

// Auth provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const isAuthenticated = !!user; // Compute isAuthenticated based on user

  // Check for stored authentication on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Failed to parse stored user:', e);
        localStorage.removeItem('user');
      }
    }
    
    setLoading(false);
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Simulate authentication delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find user in mock data
      const foundUser = mockUsers.find(u => u.email === email);
      
      if (foundUser && password === 'password') { // Simple password check for demo
        setUser(foundUser);
        localStorage.setItem('user', JSON.stringify(foundUser));
      } else {
        throw new Error('Invalid credentials');
      }
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
      // Simulate registration delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create new user
      const newUser: User = {
        id: (mockUsers.length + 1).toString(),
        email,
        name,
        role: role as 'admin' | 'client' | 'support',
        department,
        created_at: new Date().toISOString(),
      };
      
      // In a real app, you would call your API here
      // For now, we'll just set the new user
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Get all users - modified to return an array directly, not a Promise
  const getAllUsers = async (): Promise<User[]> => {
    // In a real app, this would fetch users from an API
    return [...mockUsers]; // Return a copy to prevent modifications to the original array
  };

  // Create a new user
  const createUser = async (userData: Partial<User>): Promise<User> => {
    // In a real app, this would create a user via API
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
    // In a real app, this would update a user via API
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
    // In a real app, this would delete a user via API
    const userIndex = mockUsers.findIndex(u => u.id === id);
    
    if (userIndex === -1) {
      throw new Error('User not found');
    }
    
    mockUsers.splice(userIndex, 1);
  };

  // Context value
  const value = {
    user,
    isAuthenticated, // Include the computed property
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
