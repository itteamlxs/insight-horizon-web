
import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthContextType, User } from '@/types';
import { toast } from '@/hooks/use-toast';
import { secureStorage, sanitizeInput, isValidEmail } from '@/utils/security';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    // Use secure storage instead of direct localStorage access
    const token = secureStorage.getItem('authToken');
    const userData = secureStorage.getItem('userData');
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        // Validate user data structure
        if (parsedUser && parsedUser.id && parsedUser.email && parsedUser.role) {
          setUser(parsedUser);
        } else {
          // Invalid user data, clear storage
          secureStorage.removeItem('authToken');
          secureStorage.removeItem('userData');
        }
      } catch (error) {
        console.error('Error parsing user data:', error);
        secureStorage.removeItem('authToken');
        secureStorage.removeItem('userData');
      }
    }
    setIsLoading(false);
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Sanitize and validate inputs
      const sanitizedEmail = sanitizeInput(email.toLowerCase());
      
      if (!isValidEmail(sanitizedEmail)) {
        toast({
          title: "Login Failed",
          description: "Invalid email format",
          variant: "destructive",
        });
        return false;
      }

      if (!password || password.length < 8) {
        toast({
          title: "Login Failed",
          description: "Password must be at least 8 characters",
          variant: "destructive",
        });
        return false;
      }

      // Simulate API call with hardcoded admin credentials
      if (sanitizedEmail === 'admin@techcorp.com' && password === 'SecureAdmin123!') {
        const userData: User = {
          id: '1',
          email: 'admin@techcorp.com',
          role: 'admin',
          createdAt: new Date().toISOString(),
        };
        
        // Generate a more secure token (in production, this would come from backend)
        const token = 'secure-jwt-token-' + Date.now() + '-' + Math.random().toString(36);
        
        // Use secure storage
        secureStorage.setItem('authToken', token);
        secureStorage.setItem('userData', JSON.stringify(userData));
        setUser(userData);
        
        toast({
          title: "Login Successful",
          description: "Welcome back, Administrator!",
        });
        
        return true;
      } else {
        // Add rate limiting in production
        toast({
          title: "Login Failed",
          description: "Invalid email or password",
          variant: "destructive",
        });
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login Error",
        description: "An error occurred during login",
        variant: "destructive",
      });
      return false;
    }
  };

  const logout = () => {
    secureStorage.removeItem('authToken');
    secureStorage.removeItem('userData');
    setUser(null);
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
