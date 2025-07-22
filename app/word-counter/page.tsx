import { WordCounter } from '@/components/word-counter';
import type { Metadata } from 'next';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';

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
      <main>
        <div className="max-w-2xl mx-auto flex flex-col items-center justify-center text-center mt-8 mb-8">
          <Breadcrumb className="justify-center flex mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/convertor">Tools</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Word Counter</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gradient bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-2">Word Counter</h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Free online word counter tool. Count words, characters, sentences, and paragraphs with real-time analysis. Perfect for writers, students, and content creators.
          </p>
        </div>
        <div className="max-w-3xl mx-auto">
          <WordCounter />
        </div>
      </main>
      <div className="mt-8 mx-auto text-base leading-relaxed text-muted-foreground max-w-3xl">
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