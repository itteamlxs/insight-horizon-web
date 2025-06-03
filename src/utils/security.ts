
/**
 * Security utilities for XSS prevention and input sanitization
 */

// XSS protection - sanitize HTML content
export const sanitizeHtml = (input: string): string => {
  const div = document.createElement('div');
  div.textContent = input;
  return div.innerHTML;
};

// Sanitize user inputs to prevent XSS
export const sanitizeInput = (input: string): string => {
  if (typeof input !== 'string') return '';
  return input
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocols
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim();
};

// Validate email format securely
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
};

// Validate phone number
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^\+?[\d\s\-\(\)]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
};

// Secure localStorage operations
export const secureStorage = {
  setItem: (key: string, value: string, encrypt = false): void => {
    try {
      // Don't store sensitive data in localStorage
      if (key.toLowerCase().includes('password') || 
          key.toLowerCase().includes('secret') || 
          key.toLowerCase().includes('token')) {
        console.warn('Sensitive data should not be stored in localStorage');
        return;
      }
      
      const dataToStore = encrypt ? btoa(value) : value;
      localStorage.setItem(key, dataToStore);
    } catch (error) {
      console.error('Failed to store data securely:', error);
    }
  },
  
  getItem: (key: string, decrypt = false): string | null => {
    try {
      const value = localStorage.getItem(key);
      if (!value) return null;
      return decrypt ? atob(value) : value;
    } catch (error) {
      console.error('Failed to retrieve data securely:', error);
      return null;
    }
  },
  
  removeItem: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Failed to remove data:', error);
    }
  }
};

// Validate file uploads
export const validateFileUpload = (file: File): { isValid: boolean; error?: string } => {
  const maxSize = 5 * 1024 * 1024; // 5MB
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf', 'text/plain'];
  const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'pdf', 'txt'];
  
  // Check file size
  if (file.size > maxSize) {
    return { isValid: false, error: 'File size exceeds 5MB limit' };
  }
  
  // Check MIME type
  if (!allowedTypes.includes(file.type)) {
    return { isValid: false, error: 'File type not allowed' };
  }
  
  // Check file extension
  const extension = file.name.split('.').pop()?.toLowerCase();
  if (!extension || !allowedExtensions.includes(extension)) {
    return { isValid: false, error: 'File extension not allowed' };
  }
  
  // Additional security check for file name
  if (file.name.includes('..') || file.name.includes('/') || file.name.includes('\\')) {
    return { isValid: false, error: 'Invalid file name' };
  }
  
  return { isValid: true };
};

// Prevent clickjacking
export const setSecurityHeaders = (): void => {
  // This would typically be handled server-side, but we can provide client-side protections
  if (window.self !== window.top) {
    document.body.style.display = 'none';
    console.warn('Potential clickjacking detected');
  }
};

// Generate secure random strings
export const generateSecureId = (): string => {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

// Content Security Policy recommendations
export const CSP_RECOMMENDATIONS = {
  'default-src': "'self'",
  'script-src': "'self' 'unsafe-inline'", // Consider removing unsafe-inline in production
  'style-src': "'self' 'unsafe-inline'",
  'img-src': "'self' data: https:",
  'font-src': "'self'",
  'connect-src': "'self' https:",
  'frame-ancestors': "'none'",
  'base-uri': "'self'",
  'form-action': "'self'"
};
