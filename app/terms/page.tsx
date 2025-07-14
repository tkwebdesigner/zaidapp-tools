import type { Metadata } from 'next';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: 'Terms & Conditions - Web Tools',
  description: 'Read the terms and conditions for using Web Tools. Your use of our services is subject to these terms.',
  openGraph: {
    title: 'Terms & Conditions - Web Tools',
    description: 'Read the terms and conditions for using Web Tools. Your use of our services is subject to these terms.',
    url: '/terms',
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
    title: 'Terms & Conditions - Web Tools',
    description: 'Read the terms and conditions for using Web Tools. Your use of our services is subject to these terms.',
    images: ['/images/app-logo.svg'],
  },
  alternates: {
    canonical: '/terms',
  },
};

export default function TermsPage() {
  return (
    <main className="flex justify-center items-center min-h-[80vh] bg-background px-2">
      <Card className="w-full max-w-2xl shadow-xl">
        <CardHeader className="flex flex-col items-center">
          <Image src="/images/app-logo.svg" alt="Web Tools Logo" width={96} height={96} className="mb-2" />
          <CardTitle className="text-3xl font-bold mb-2">Terms & Conditions</CardTitle>
          <Badge variant="secondary" className="mb-2">Please Read Carefully</Badge>
        </CardHeader>
        <CardContent className="text-muted-foreground space-y-4 text-sm">
          <p>By accessing or using Web Tools, you agree to be bound by these Terms & Conditions. If you do not agree with any part of the terms, you may not use our services.</p>
          <p>We reserve the right to update or change these terms at any time. Continued use of the service after changes constitutes acceptance of those changes.</p>
          <p>All content and tools are provided "as is" without warranty of any kind. We are not liable for any damages arising from the use of our services.</p>
          <p>For questions, please contact us at <a href="mailto:support@your-domain.com" className="underline">support@your-domain.com</a>.</p>
        </CardContent>
      </Card>
    </main>
  );
} 