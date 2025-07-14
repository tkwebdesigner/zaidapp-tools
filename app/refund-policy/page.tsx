import type { Metadata } from 'next';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: 'Return & Refund Policy - Web Tools',
  description: 'Read our return and refund policy for Web Tools. Learn about eligibility and the process for requesting a refund.',
  openGraph: {
    title: 'Return & Refund Policy - Web Tools',
    description: 'Read our return and refund policy for Web Tools. Learn about eligibility and the process for requesting a refund.',
    url: '/refund-policy',
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
    title: 'Return & Refund Policy - Web Tools',
    description: 'Read our return and refund policy for Web Tools. Learn about eligibility and the process for requesting a refund.',
    images: ['/images/app-logo.svg'],
  },
  alternates: {
    canonical: '/refund-policy',
  },
};

export default function RefundPolicyPage() {
  return (
    <main className="flex justify-center items-center min-h-[80vh] bg-background px-2">
      <Card className="w-full max-w-2xl shadow-xl">
        <CardHeader className="flex flex-col items-center">
          <Image src="/images/app-logo.svg" alt="Web Tools Logo" width={96} height={96} className="mb-2" />
          <CardTitle className="text-3xl font-bold mb-2">Return & Refund Policy</CardTitle>
          <Badge variant="secondary" className="mb-2">Our Commitment</Badge>
        </CardHeader>
        <CardContent className="text-muted-foreground space-y-4 text-sm">
          <p>As Web Tools is a free service, we do not offer paid products or subscriptions. Therefore, returns and refunds are not applicable.</p>
          <p>If you have any concerns or issues with our tools, please contact us at <a href="mailto:support@your-domain.com" className="underline">support@your-domain.com</a> and we will do our best to assist you.</p>
        </CardContent>
      </Card>
    </main>
  );
} 