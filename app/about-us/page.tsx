import type { Metadata } from 'next';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: 'About Us - Web Tools',
  description: 'Learn more about the team and mission behind Web Tools. We provide free, professional, and privacy-focused online tools for everyone.',
  openGraph: {
    title: 'About Us - Web Tools',
    description: 'Learn more about the team and mission behind Web Tools. We provide free, professional, and privacy-focused online tools for everyone.',
    url: '/about-us',
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
    title: 'About Us - Web Tools',
    description: 'Learn more about the team and mission behind Web Tools. We provide free, professional, and privacy-focused online tools for everyone.',
    images: ['/images/app-logo.svg'],
  },
  alternates: {
    canonical: '/about-us',
  },
};

export default function AboutUsPage() {
  return (
    <div className="w-full">
      <Card className="w-full">
        <CardHeader className="flex flex-col items-center">
          <Image src="/images/app-logo.svg" alt="Web Tools Logo" width={96} height={96} className="mb-2" />
          <CardTitle className="text-3xl font-bold mb-2">About Us</CardTitle>
          <Badge variant="secondary" className="mb-2">Empowering Productivity</Badge>
        </CardHeader>
        <CardContent className="text-center text-lg text-muted-foreground space-y-4">
          <p>
            <strong>Web Tools</strong> is a collection of free, professional-grade online tools designed for content creators, students, and professionals. Our mission is to make powerful utilities accessible to everyone, with a focus on privacy, speed, and ease of use.
          </p>
          <p>
            We believe in a privacy-first approach—your data stays on your device. No registration, no tracking, just fast and reliable tools.
          </p>
          <p>
            Built by a passionate team, we are committed to continuous improvement and adding new features based on your feedback.
          </p>
        </CardContent>
      </Card>
    </div>
  );
} 