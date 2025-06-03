
import React, { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { sanitizeInput } from '@/utils/security';
import { cn } from '@/lib/utils';

interface SecureTextareaProps extends React.ComponentProps<typeof Textarea> {
  maxLength?: number;
  onSecureChange?: (value: string, isValid: boolean) => void;
}

export const SecureTextarea = React.forwardRef<HTMLTextAreaElement, SecureTextareaProps>(
  ({ className, maxLength = 5000, onSecureChange, onChange, ...props }, ref) => {
    const [isValid, setIsValid] = useState(true);
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const sanitizedValue = sanitizeInput(e.target.value);
      const valid = sanitizedValue.length <= maxLength;
      
      setIsValid(valid);
      setError(valid ? '' : `Text exceeds ${maxLength} characters`);
      
      // Update the textarea value with sanitized content
      e.target.value = sanitizedValue;
      
      onSecureChange?.(sanitizedValue, valid);
      onChange?.(e);
    };

    return (
      <div>
        <Textarea
          ref={ref}
          className={cn(
            className,
            !isValid && 'border-red-500 focus:border-red-500'
          )}
          onChange={handleChange}
          maxLength={maxLength}
          {...props}
        />
        {!isValid && error && (
          <p className="text-sm text-red-500 mt-1">{error}</p>
        )}
      </div>
    );
  }
);

SecureTextarea.displayName = 'SecureTextarea';
