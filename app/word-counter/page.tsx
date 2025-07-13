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
  },
  twitter: {
    title: 'Word Counter - Count Words, Characters & More',
    description: 'Free online word counter tool. Count words, characters, sentences, and paragraphs with real-time analysis.',
  },
  alternates: {
    canonical: '/word-counter',
  },
};

export default function WordCounterPage() {
  return <main><WordCounter /></main>;
} 