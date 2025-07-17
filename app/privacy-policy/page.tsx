import type { Metadata } from 'next';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: 'Privacy Policy - Web Tools',
  description: 'Read our privacy policy to understand how we handle your data and protect your privacy at Web Tools.',
  openGraph: {
    title: 'Privacy Policy - Web Tools',
    description: 'Read our privacy policy to understand how we handle your data and protect your privacy at Web Tools.',
    url: '/privacy-policy',
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
    title: 'Privacy Policy - Web Tools',
    description: 'Read our privacy policy to understand how we handle your data and protect your privacy at Web Tools.',
    images: ['/images/app-logo.svg'],
  },
  alternates: {
    canonical: '/privacy-policy',
  },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="flex justify-center items-center">
      <Card className="w-full">
        <CardHeader className="flex flex-col items-center">
          <Image src="/images/app-logo.svg" alt="Web Tools Logo" width={96} height={96} className="mb-2" />
          <CardTitle className="text-3xl font-bold mb-2">Privacy Policy</CardTitle>
          <Badge variant="secondary" className="mb-2">Your Privacy Matters</Badge>
        </CardHeader>
        <CardContent className="text-muted-foreground space-y-4 text-sm">
          <p>We value your privacy. Web Tools does not collect or store any personal data unless you explicitly provide it (e.g., via contact forms).</p>
          <p>All processing is done on your device whenever possible. We do not track, sell, or share your information with third parties.</p>
          <p>For questions about our privacy practices, contact us at <a href="mailto:contact@zaidapp.com" className="underline">contact@zaidapp.com</a>.</p>
        </CardContent>
      </Card>
    </main>
  );
} 