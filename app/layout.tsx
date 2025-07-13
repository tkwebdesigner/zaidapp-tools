import './globals.css';
import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { Layout } from '@/components/layout';
import { cn } from '@/lib/utils';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'Web Tools - Free Professional Tools for Content Creators',
    template: '%s | Web Tools'
  },
  description: 'Free professional web tools including Word Counter, Age Calculator, SEO Checker, and Image Converter. No registration required, privacy-focused, and always available.',
  keywords: [
    'web tools',
    'word counter',
    'age calculator', 
    'seo checker',
    'image converter',
    'text analysis',
    'content tools',
    'free tools',
    'professional tools',
    'online utilities'
  ].join(', '),
  authors: [{ name: 'Tofique Khan' }],
  creator: 'ZaidApp',
  publisher: 'ZaidApp',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'Web Tools - Free Professional Tools for Content Creators',
    description: 'Free professional web tools including Word Counter, Age Calculator, SEO Checker, and Image Converter. No registration required, privacy-focused, and always available.',
    siteName: 'Web Tools',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Web Tools - Professional Free Tools Collection',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Web Tools - Free Professional Tools for Content Creators',
    description: 'Free professional web tools including Word Counter, Age Calculator, SEO Checker, and Image Converter. No registration required, privacy-focused, and always available.',
    images: ['/twitter-image.jpg'],
    creator: '@webtools',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  alternates: {
    canonical: '/',
  },
  category: 'technology',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="msapplication-TileColor" content="#3b82f6" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Web Tools",
              "description": "Free professional web tools for content creators and professionals",
              "url": process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": "/search?q={search_term_string}"
                },
                "query-input": "required name=search_term_string"
              },
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              }
            })
          }}
        />
      </head>
      <body className={outfit.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Layout>
            {children}
          </Layout>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}