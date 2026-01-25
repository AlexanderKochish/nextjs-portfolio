import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  subject: z.string().max(150, 'Subject is too long').optional(),
  message: z.string().min(1, 'Message is required').max(1000, 'Message is too long'),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
