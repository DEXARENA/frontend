import { useState } from 'react';
import { addToWaitlist } from '@/lib/supabase';
import { toast } from '@/hooks/use-toast';

export function useWaitlist() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const result = await addToWaitlist(email);
      
      if (result.success) {
        toast({
          title: "Successfully joined waitlist!",
          description: "We'll notify you when you're granted access.",
          variant: "default",
        });
        setEmail('');
      } else {
        // Check if it's a duplicate email error
        if (result.error && result.error.code === '23505') {
          toast({
            title: "Already on the waitlist",
            description: "This email is already registered on our waitlist.",
            variant: "default",
          });
        } else {
          toast({
            title: "Something went wrong",
            description: "Please try again later.",
            variant: "destructive",
          });
        }
      }
    } catch (error) {
      toast({
        title: "Error joining waitlist",
        description: "Please try again later.",
        variant: "destructive",
      });
      console.error('Waitlist submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    email,
    setEmail,
    isSubmitting,
    handleSubmitEmail,
  };
}
