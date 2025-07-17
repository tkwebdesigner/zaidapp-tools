
"use client";
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState } from 'react';

const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(7, 'Phone number is required'),
  message: z.string().min(5, 'Message is required'),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    setLoading(true);
    setError('');
    setSuccess(false);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to send message');
      setSuccess(true);
      reset();
    } catch (e) {
      setError('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="flex flex-col items-center">
        <Image src="/images/app-logo.svg" alt="Web Tools Logo" width={96} height={96} className="mb-2" />
        <CardTitle className="text-3xl font-bold mb-2">Contact Us</CardTitle>
        <Badge variant="secondary" className="mb-2">We're here to help</Badge>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <Input type="text" placeholder="Your Name" {...register('name')} disabled={loading} />
          {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
          <Input type="email" placeholder="Your Email" {...register('email')} disabled={loading} />
          {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
          <Input type="tel" placeholder="Your Phone Number" {...register('phone')} disabled={loading} />
          {errors.phone && <p className="text-red-500 text-xs">{errors.phone.message}</p>}
          <Textarea placeholder="Your Message" rows={5} {...register('message')} disabled={loading} />
          {errors.message && <p className="text-red-500 text-xs">{errors.message.message}</p>}
          <Button type="submit" className="w-full" disabled={loading}>{loading ? 'Sending...' : 'Send Message'}</Button>
          {success && <p className="text-green-600 text-center">Message sent successfully!</p>}
          {error && <p className="text-red-500 text-center">{error}</p>}
        </form>
        <div className="mt-6 text-center text-muted-foreground text-sm">
          <p>Email: <a href="mailto:contact@zaidapp.com" className="underline">contact@zaidapp.com</a></p>
          <p>We aim to respond within 24 hours.</p>
        </div>
      </CardContent>
    </Card>
  );
} 