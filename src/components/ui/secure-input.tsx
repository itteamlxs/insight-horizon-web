
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { sanitizeInput, isValidEmail } from '@/utils/security';
import { cn } from '@/lib/utils';

interface SecureInputProps extends React.ComponentProps<typeof Input> {
  validation?: 'email' | 'phone' | 'text' | 'url';
  onSecureChange?: (value: string, isValid: boolean) => void;
}

export const SecureInput = React.forwardRef<HTMLInputElement, SecureInputProps>(
  ({ className, validation, onSecureChange, onChange, ...props }, ref) => {
    const [isValid, setIsValid] = useState(true);
    const [error, setError] = useState('');

    const validateInput = (value: string): boolean => {
      let valid = true;
      let errorMsg = '';

      switch (validation) {
        case 'email':
          valid = isValidEmail(value);
          errorMsg = valid ? '' : 'Invalid email format';
          break;
        case 'phone':
          valid = /^\+?[\d\s\-\(\)]+$/.test(value) && value.replace(/\D/g, '').length >= 10;
          errorMsg = valid ? '' : 'Invalid phone number';
          break;
        case 'url':
          try {
            new URL(value);
            valid = true;
          } catch {
            valid = false;
            errorMsg = 'Invalid URL format';
          }
          break;
        default:
          valid = value.length <= 1000; // Prevent extremely long inputs
          errorMsg = valid ? '' : 'Input too long';
      }

      setIsValid(valid);
      setError(errorMsg);
      return valid;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const sanitizedValue = sanitizeInput(e.target.value);
      const valid = validateInput(sanitizedValue);
      
      // Update the input value with sanitized content
      e.target.value = sanitizedValue;
      
      onSecureChange?.(sanitizedValue, valid);
      onChange?.(e);
    };

    return (
      <div>
        <Input
          ref={ref}
          className={cn(
            className,
            !isValid && 'border-red-500 focus:border-red-500'
          )}
          onChange={handleChange}
          {...props}
        />
        {!isValid && error && (
          <p className="text-sm text-red-500 mt-1">{error}</p>
        )}
      </div>
    );
  }
);

SecureInput.displayName = 'SecureInput';
