import { SEOChecker } from '@/components/seo-checker';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SEO Checker - Analyze Website SEO Performance',
  description: 'Free online SEO checker tool. Analyze your website\'s SEO performance with comprehensive metrics and actionable recommendations for better search rankings.',
  keywords: 'seo checker, seo analyzer, website seo, search engine optimization, seo tool, meta tag analyzer',
  openGraph: {
    title: 'SEO Checker - Analyze Website SEO Performance',
    description: 'Free online SEO checker tool. Analyze your website\'s SEO performance with comprehensive metrics and actionable recommendations.',
    url: '/seo-checker',
    images: [
      {
        url: '/sharing-images/seo-checker-tool.webp',
        width: 1200,
        height: 630,
        alt: 'SEO Checker Tool',
        type: 'image/webp',
      },
    ],
  },
  twitter: {
    title: 'SEO Checker - Analyze Website SEO Performance',
    description: 'Free online SEO checker tool. Analyze your website\'s SEO performance with comprehensive metrics and actionable recommendations.',
    images: ['/sharing-images/seo-checker-tool.webp'],
  },
  alternates: {
    canonical: '/seo-checker',
  },
};

export default function SEOCheckerPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "SEO Checker",
            "description": "Free online SEO checker tool. Analyze your website's SEO performance with comprehensive metrics and actionable recommendations.",
            "image": "/sharing-images/seo-checker-tool.webp",
            "url": `${siteUrl}/seo-checker`
          })
        }}
      />
      <main><SEOChecker /></main>
    </>
  );
} 