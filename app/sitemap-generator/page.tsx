import React from "react";
import type { Metadata } from 'next';

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
  return (
    <>
      <SitemapGeneratorClient />
      <div className="mt-4 mx-auto text-base leading-relaxed text-muted-foreground">
        <h2 className="text-2xl font-bold mb-4 text-foreground">About the Sitemap Generator Tool</h2>
        <p>
          The Sitemap Generator tool is an invaluable resource for website owners, developers, and SEO professionals. It enables you to create comprehensive HTML and XML sitemaps for your website, including options for image sitemaps. Sitemaps help search engines discover and index your site’s pages more efficiently, improving your site’s visibility and ranking.
        </p>
        <p className="mt-4">
          Using the Sitemap Generator is simple—just enter your website URL, select the type of sitemap you need, and click generate. The tool crawls your site and produces a sitemap that you can download and submit to search engines like Google and Bing. It supports both standard and image sitemaps, making it suitable for a wide range of websites.
        </p>
        <p className="mt-4">
          The tool’s interface is clean and user-friendly, with clear instructions and helpful feedback during the generation process. It’s designed to work seamlessly on any device, so you can generate sitemaps from your desktop or mobile device. Your privacy is protected—no data is stored or shared.
        </p>
        <p className="mt-4">
          The Sitemap Generator is perfect for regular site maintenance, launching new websites, or troubleshooting indexing issues. It’s a must-have for webmasters, digital marketers, and anyone looking to improve their site’s SEO. The tool is completely free to use, with no registration required.
        </p>
        <p className="mt-4">
          Try the Sitemap Generator today and ensure your website is fully optimized for search engine discovery and ranking!
        </p>
      </div>
    </>
  );
} 