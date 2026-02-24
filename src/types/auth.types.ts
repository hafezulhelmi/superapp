/**
 * User Profile Type Definition
 * Shared across all Mini Apps in the SuperApp
 */
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'superadmin' | 'admin' | 'user';
}

/**
 * Authentication State Type
 */
export interface AuthState {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
