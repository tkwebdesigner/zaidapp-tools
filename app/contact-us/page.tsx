import type { Metadata } from 'next';
import { ContactForm } from '@/components/contact-form';

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
    <main className="flex justify-center items-center min-h-[80vh]">
      <ContactForm />
    </main>
  );
} 