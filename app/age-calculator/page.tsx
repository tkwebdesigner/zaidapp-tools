import { AgeCalculator } from '@/components/age-calculator';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Age Calculator - Calculate Age & Time Differences',
  description: 'Free online age calculator tool. Calculate exact age, time differences, and important dates. Useful for planning, documentation, and personal records.',
  keywords: 'age calculator, date calculator, time difference, age calculation tool, birthday calculator',
  openGraph: {
    title: 'Age Calculator - Calculate Age & Time Differences',
    description: 'Free online age calculator tool. Calculate exact age, time differences, and important dates.',
    url: '/age-calculator',
    images: [
      {
        url: '/sharing-images/bith-date-calculator.webp',
        width: 1200,
        height: 630,
        alt: 'Age Calculator Tool',
        type: 'image/webp',
      },
    ],
  },
  twitter: {
    title: 'Age Calculator - Calculate Age & Time Differences',
    description: 'Free online age calculator tool. Calculate exact age, time differences, and important dates.',
    images: ['/sharing-images/bith-date-calculator.webp'],
  },
  alternates: {
    canonical: '/age-calculator',
  },
};

export default function AgeCalculatorPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Age Calculator",
            "description": "Free online age calculator tool. Calculate exact age, time differences, and important dates.",
            "image": "/sharing-images/bith-date-calculator.webp",
            "url": `${siteUrl}/age-calculator`
          })
        }}
      />
      <main><AgeCalculator /></main>
    </>
  );
} 