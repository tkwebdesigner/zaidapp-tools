import React from "react";
import type { Metadata } from 'next';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: 'Sitemap Generator - Create HTML & XML Sitemaps',
  description: 'Free online sitemap generator tool. Create HTML, XML, and image sitemaps for your website with ease.',
  keywords: 'sitemap generator, xml sitemap, html sitemap, image sitemap, website sitemap tool',
  openGraph: {
    title: 'Sitemap Generator - Create HTML & XML Sitemaps',
    description: 'Free online sitemap generator tool. Create HTML, XML, and image sitemaps for your website with ease.',
    url: '/sitemap-generator',
    images: [
      {
        url: '/sharing-images/sitemap-generator-tool.webp',
        width: 1200,
        height: 630,
        alt: 'Sitemap Generator Tool',
        type: 'image/webp',
      },
    ],
  },
  twitter: {
    title: 'Sitemap Generator - Create HTML & XML Sitemaps',
    description: 'Free online sitemap generator tool. Create HTML, XML, and image sitemaps for your website with ease.',
    images: ['/sharing-images/sitemap-generator-tool.webp'],
  },
  alternates: {
    canonical: '/sitemap-generator',
  },
};

import SitemapGeneratorClient from './SitemapGeneratorClient';

export default function SitemapGeneratorPage() {
  return <SitemapGeneratorClient />;
} 