
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { SecureInput } from '@/components/ui/secure-input';
import { SecureTextarea } from '@/components/ui/secure-textarea';
import { X } from 'lucide-react';
import { sanitizeHtml } from '@/utils/security';

interface ContactFormProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan?: string;
}

const ContactForm = ({ isOpen, onClose, selectedPlan }: ContactFormProps) => {
  const [formData, setFormData] = React.useState({
    fullName: '',
    email: '',
    phone: '',
    message: ''
  });
  
  const [validationState, setValidationState] = React.useState({
    fullName: true,
    email: true,
    phone: true,
    message: true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Final validation before submission
    const isFormValid = Object.values(validationState).every(valid => valid) &&
                       Object.values(formData).every(value => value.trim() !== '');
    
    if (!isFormValid) {
      alert('Please fill in all fields correctly');
      return;
    }
    
    console.log('Contact form submitted:', { 
      ...formData, 
      selectedPlan: selectedPlan ? sanitizeHtml(selectedPlan) : undefined 
    });
    
    // Here you would typically send the data to your backend with CSRF protection
    alert('Thank you for your interest! We will contact you soon.');
    onClose();
  };

  const handleSecureChange = (field: keyof typeof formData) => 
    (value: string, isValid: boolean) => {
      setFormData(prev => ({ ...prev, [field]: value }));
      setValidationState(prev => ({ ...prev, [field]: isValid }));
    };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md dark:bg-gray-800 dark:border-gray-700">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="dark:text-white">Contact Us</CardTitle>
            <CardDescription className="dark:text-gray-300">
              {selectedPlan && `Selected Plan: ${sanitizeHtml(selectedPlan)}`}
            </CardDescription>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="fullName" className="dark:text-white">Full Name</Label>
              <SecureInput
                id="fullName"
                name="fullName"
                validation="text"
                onSecureChange={handleSecureChange('fullName')}
                required
                className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                maxLength={100}
              />
            </div>
            <div>
              <Label htmlFor="email" className="dark:text-white">Email</Label>
              <SecureInput
                id="email"
                name="email"
                type="email"
                validation="email"
                onSecureChange={handleSecureChange('email')}
                required
                className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div>
              <Label htmlFor="phone" className="dark:text-white">Phone Number</Label>
              <SecureInput
                id="phone"
                name="phone"
                type="tel"
                validation="phone"
                onSecureChange={handleSecureChange('phone')}
                required
                className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div>
              <Label htmlFor="message" className="dark:text-white">Message</Label>
              <SecureTextarea
                id="message"
                name="message"
                onSecureChange={handleSecureChange('message')}
                maxLength={2000}
                rows={4}
                className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Tell us about your requirements..."
              />
            </div>
            <div className="flex gap-2">
              <Button type="submit" className="flex-1">
                Send Message
              </Button>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactForm;
