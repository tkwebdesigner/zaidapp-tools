import type { Metadata } from 'next';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: 'Disclaimer - Web Tools',
  description: 'Read our disclaimer to understand the limitations of our tools and services at Web Tools.',
  openGraph: {
    title: 'Disclaimer - Web Tools',
    description: 'Read our disclaimer to understand the limitations of our tools and services at Web Tools.',
    url: '/disclaimer',
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
    title: 'Disclaimer - Web Tools',
    description: 'Read our disclaimer to understand the limitations of our tools and services at Web Tools.',
    images: ['/images/app-logo.svg'],
  },
  alternates: {
    canonical: '/disclaimer',
  },
};

export default function DisclaimerPage() {
  return (
    <main className="flex justify-center items-center">
      <Card className="w-full">
        <CardHeader className="flex flex-col items-center">
          <Image src="/images/app-logo.svg" alt="Web Tools Logo" width={96} height={96} className="mb-2" />
          <CardTitle className="text-3xl font-bold mb-2">Disclaimer</CardTitle>
          <Badge variant="secondary" className="mb-2">Please Note</Badge>
        </CardHeader>
        <CardContent className="text-muted-foreground space-y-4 text-sm">
          <p>All tools and content provided by Web Tools are for informational and utility purposes only. We make no guarantees regarding accuracy or suitability for any specific purpose.</p>
          <p>Use of our tools is at your own risk. We are not liable for any damages or losses resulting from the use of our services.</p>
          <p>For questions, contact us at <a href="mailto:contact@zaidapp.com" className="underline">contact@zaidapp.com</a>.</p>
        </CardContent>
      </Card>
    </main>
  );
} 