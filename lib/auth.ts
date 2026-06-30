// Simple JWT authentication with HTTP-only cookies

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

export interface User {
  userId: string;
  email: string;
  username: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

/**
 * Register new user
 */
export async function register(email: string, password: string, username?: string) {
  const response = await fetch(`${BACKEND_URL}/api/users/register/`, {
    method: 'POST',
    credentials: 'include', // Send/receive cookies
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, username }),
  });
  
  const data = await response.json();
  
  if (data.success) {
    return { success: true, user: data.data.user };
  }
  
  return { success: false, error: data.error.message };
}

/**
 * Login user
 */
export async function login(email: string, password: string) {
  const response = await fetch(`${BACKEND_URL}/api/users/login/`, {
    method: 'POST',
    credentials: 'include', // Send/receive cookies
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  
  const data = await response.json();
  
  if (data.success) {
    return { success: true, user: data.data.user };
  }
  
  return { success: false, error: data.error.message };
}

/**
 * Get current user from backend
 */
export async function getCurrentUser(): Promise<User | null> {
  try {
    const response = await fetch(`${BACKEND_URL}/api/users/user/`, {
      credentials: 'include', // Send cookies
    });
    
    if (!response.ok) {
      // Token might be expired, try refresh
      const refreshed = await refreshAccessToken();
      if (refreshed) {
        return getCurrentUser(); // Retry with new token
      }
      return null;
    }
    
    const data = await response.json();
    if (data.success) {
      return data.data;
    }
    
    return null;
  } catch (error) {
    console.error('Failed to get user:', error);
    return null;
  }
}

/**
 * Refresh access token
 */
export async function refreshAccessToken(): Promise<boolean> {
  try {
    const response = await fetch(`${BACKEND_URL}/api/users/refresh/`, {
      method: 'POST',
      credentials: 'include', // Send refresh cookie
    });
    
    const data = await response.json();
    return data.success;
  } catch (error) {
    return false;
  }
}

/**
 * Logout user
 */
export async function logout() {
  try {
    await fetch(`${BACKEND_URL}/api/users/logout/`, {
      method: 'POST',
      credentials: 'include',
    });
  } catch (error) {
    console.error('Logout error:', error);
  }
}

/**
 * Login as guest (temporary account)
 */
export async function guestLogin() {
  try {
    const response = await fetch(`${BACKEND_URL}/api/users/guest-login/`, {
      method: 'POST',
      credentials: 'include',
    });
    
    const data = await response.json();
    
    if (data.success) {
      return { success: true, user: data.data.user, isGuest: true };
    }
    
    return { success: false, error: data.error.message };
  } catch (error) {
    console.error('Guest login error:', error);
    return { success: false, error: 'Failed to create guest account' };
  }
}
