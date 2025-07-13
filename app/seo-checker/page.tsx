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
  },
  twitter: {
    title: 'SEO Checker - Analyze Website SEO Performance',
    description: 'Free online SEO checker tool. Analyze your website\'s SEO performance with comprehensive metrics and actionable recommendations.',
  },
  alternates: {
    canonical: '/seo-checker',
  },
};

export default function SEOCheckerPage() {
  return <main><SEOChecker /></main>;
} 