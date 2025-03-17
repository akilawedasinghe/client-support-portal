
// Auth related types for the application

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'client' | 'support';
  avatar?: string;
  department?: string;
  created_at?: string;
}

export type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean; // Add this missing property
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string, name: string, role: string, department?: string) => Promise<void>;
  loading: boolean;
  getAllUsers: () => Promise<User[]>;
  createUser: (userData: Partial<User>) => Promise<User>;
  updateUser: (id: string, userData: Partial<User>) => Promise<User>;
  deleteUser: (id: string) => Promise<void>;
};
