import type { Metadata } from 'next';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Contact Us - Web Tools',
  description: 'Contact the Web Tools team for support, feedback, or partnership inquiries. We are here to help you.',
  openGraph: {
    title: 'Contact Us - Web Tools',
    description: 'Contact the Web Tools team for support, feedback, or partnership inquiries. We are here to help you.',
    url: '/contact-us',
    images: [
      {
        url: '/images/app-logo.svg',
        width: 512,
        height: 512,
        alt: 'Web Tools Logo',
        type: 'image/svg+xml',
      },
    ],
  },
  twitter: {
    title: 'Contact Us - Web Tools',
    description: 'Contact the Web Tools team for support, feedback, or partnership inquiries. We are here to help you.',
    images: ['/images/app-logo.svg'],
  },
  alternates: {
    canonical: '/contact-us',
  },
};

export default function ContactUsPage() {
  return (
    <main className="flex justify-center items-center min-h-[80vh] bg-background px-2">
      <Card className="w-full max-w-2xl shadow-xl">
        <CardHeader className="flex flex-col items-center">
          <Image src="/images/app-logo.svg" alt="Web Tools Logo" width={96} height={96} className="mb-2" />
          <CardTitle className="text-3xl font-bold mb-2">Contact Us</CardTitle>
          <Badge variant="secondary" className="mb-2">We're here to help</Badge>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <Input type="text" placeholder="Your Name" required />
            <Input type="email" placeholder="Your Email" required />
            <Textarea placeholder="Your Message" rows={5} required />
            <Button type="submit" className="w-full">Send Message</Button>
          </form>
          <div className="mt-6 text-center text-muted-foreground text-sm">
            <p>Email: <a href="mailto:support@your-domain.com" className="underline">support@your-domain.com</a></p>
            <p>We aim to respond within 24 hours.</p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
} 