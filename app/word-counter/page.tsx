import { WordCounter } from '@/components/word-counter';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Word Counter - Count Words, Characters & More',
  description: 'Free online word counter tool. Count words, characters, sentences, and paragraphs with real-time analysis. Perfect for writers, students, and content creators.',
  keywords: 'word counter, character count, text analysis, writing tools, content analysis, word count tool',
  openGraph: {
    title: 'Word Counter - Count Words, Characters & More',
    description: 'Free online word counter tool. Count words, characters, sentences, and paragraphs with real-time analysis.',
    url: '/word-counter',
    images: [
      {
        url: '/sharing-images/word-counter.webp',
        width: 1200,
        height: 630,
        alt: 'Word Counter Tool',
        type: 'image/webp',
      },
    ],
  },
  twitter: {
    title: 'Word Counter - Count Words, Characters & More',
    description: 'Free online word counter tool. Count words, characters, sentences, and paragraphs with real-time analysis.',
    images: ['/sharing-images/word-counter.webp'],
  },
  alternates: {
    canonical: '/word-counter',
  },
};

export default function WordCounterPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Word Counter",
            "description": "Free online word counter tool. Count words, characters, sentences, and paragraphs with real-time analysis.",
            "image": "/sharing-images/word-counter.webp",
            "url": `${siteUrl}/word-counter`
          })
        }}
      />
      <main><WordCounter /></main>
    </>
  );
} 