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
      <div className="mt-4 mx-auto text-base leading-relaxed text-muted-foreground">
        <h2 className="text-2xl font-bold mb-4 text-foreground">About the Word Counter Tool</h2>
        <p>
          The Word Counter tool is an essential utility for writers, students, professionals, and anyone who works with text. It provides instant and accurate counts of words, characters, sentences, and even estimates reading time. Whether you are preparing an essay, writing a blog post, or crafting a social media update, knowing your word and character count is crucial for meeting requirements and optimizing your content.
        </p>
        <p className="mt-4">
          This tool is designed for simplicity and speed. Just paste or type your text into the input area, and the results update in real time. The Word Counter supports a wide range of languages and recognizes various punctuation and formatting, ensuring reliable results for any type of content. It’s perfect for students checking essay lengths, marketers optimizing ad copy, or authors tracking their writing progress.
        </p>
        <p className="mt-4">
          In addition to basic counts, the tool also provides sentence counts and an estimated reading time, helping you tailor your content for your audience. The clean, distraction-free interface makes it easy to focus on your writing, and the responsive design ensures it works seamlessly on any device, from desktop to mobile.
        </p>
        <p className="mt-4">
          Privacy is a top priority—your text is never stored or shared. The Word Counter is completely free to use, with no registration required. Whether you’re a student, teacher, journalist, or content creator, this tool is a must-have for your productivity toolkit. Try it now and experience the convenience of instant, accurate word and character counting!
        </p>
      </div>
    </>
  );
} 