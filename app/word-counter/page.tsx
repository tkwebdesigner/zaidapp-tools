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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Image from 'next/image';

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
      <div className="mt-8 mx-auto text-base leading-relaxed text-muted-foreground">
        <h2 className="text-2xl font-bold mb-4 text-foreground">What is a Word Counter Tool?</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5'>
          <Image className='rounded-lg shadow-sm border' src={'/sharing-images/word-counter.webp'} alt='Word Counter Tool' title='Word Counter Tool' width={1200} height={675} />
          <div>
            <p>
              A Word Counter Tool is a simple yet powerful utility designed to instantly calculate the number of <strong>words, characters, sentences, and paragraphs</strong> in a given piece of text. Whether you&apos;re writing an academic essay, a blog post, or a tweet, knowing your text length is essential for staying within required limits and optimizing for different platforms.
            </p>
            <p className="mt-4">
              In the past, writers had to count manually or rely on clunky word processors. Today’s advanced digital tools offer instant, real-time word count analysis, eliminating guesswork and boosting efficiency.
            </p>
            <p className="mt-4">
              With a user-friendly interface and lightning-fast processing, a Word Counter Tool empowers users to focus solely on their writing without worrying about formatting or compliance issues. It not only enhances productivity but also improves the overall quality of content by encouraging concise, well-structured writing. Whether you&apos;re fine-tuning a social media post to fit character limits or polishing a long-form article for publication, this tool becomes an indispensable part of your digital writing toolkit.
            </p>
          </div>
        </div>
        <h2 className="text-2xl font-bold my-4 text-foreground">Key Features of an Online Word Counter Tool</h2>
        <p className="mt-4">
          Modern word counter tools offer a robust set of features beyond just counting words:
        </p>
        <ul className='list-disc pl-5 mt-4'>
          <li>
            <strong>Real-Time Word and Character Count:</strong> As you type or paste your text, the count updates automatically—no need to press buttons.
          </li>
          <li>
            <strong>Sentence and Paragraph Breakdown:</strong> Understand your writing structure better with detailed sentence and paragraph metrics.
          </li>
          <li>
            <strong>Estimated Reading Time:</strong> Helps you tailor your content’s length for blogs, newsletters, or presentations.
          </li>
          <li>
            <strong>Multi-Language Support:</strong> The tool recognizes many scripts and formatting styles, making it ideal for global users.
          </li>
          <li>
            <strong>Responsive Design:</strong> Seamlessly works on mobile, tablet, or desktop, ensuring you can use it anywhere.
          </li>
        </ul>
        <h2 className="text-2xl font-bold my-4 text-foreground">Who Can Benefit from a Word Counter Tool?</h2>
        <p className="mt-4">
          This versatile tool is helpful for:
        </p>
        <ul className='list-disc pl-5 mt-4'>
          <li><strong>Students</strong> working on assignments, theses, and essays.</li>
          <li><strong>Writers and bloggers</strong> needing to meet editorial word count guidelines.</li>
          <li><strong>Marketers</strong> optimizing ad copy or social media posts.</li>
          <li><strong>Teachers and editors</strong> checking content for structure and clarity.</li>
          <li><strong>Job seekers</strong> polishing resumes and cover letters to the ideal length.</li>
        </ul>
        <h2 className="text-2xl font-bold my-4 text-foreground">Why Word and Character Counts Matter in Writing</h2>
        <p className="mt-4">
          Word and character counts aren’t just metrics—they’re <strong>strategic tools</strong>. Here’s why:
        </p>
        <ul className='list-disc pl-5 mt-4'>
          <li><strong>Academic assignments</strong> have strict word limits to test clarity and depth.</li>
          <li><strong>SEO-optimized</strong> content often requires minimum word counts for Google rankings.</li>
          <li><strong>Social platforms</strong> (like Twitter or Instagram) impose <strong>character limits</strong>.</li>
          <li><strong>Publishing houses</strong> have specific length requirements for submissions.</li>
        </ul>
        <h2 className="text-2xl font-bold my-4 text-foreground">How to Use a Word Counter Tool Efficiently</h2>
        <ol className="list-decimal pl-5 mt-4">
          <li><strong>Paste or Type Your Content</strong> into the text box.</li>
          <li><strong>Check the Live Statistics:</strong> Word count, characters, sentences, and reading time.</li>
          <li><strong>Revise Accordingly</strong> based on the platform’s requirements.</li>
        </ol>
        <h3 className="text-xl font-bold my-4 text-foreground">Tips</h3>
        <ul className='list-disc pl-5 mt-4'>
          <li>Break longer paragraphs for better readability.</li>
          <li>Watch your sentence length for clarity.</li>
          <li>Use the tool before and after editing to see your progress.</li>
        </ul>
        <h2 className="text-2xl font-bold my-4 text-foreground">Privacy and Security of Your Content</h2>
        <p className="mt-4">
          One major concern online is <strong>data security</strong>. Rest assured:
        </p>
        <ul className='list-disc pl-5 mt-4'>
          <li><b>No data is stored or shared.</b></li>
          <li><b>No account or registration is needed.</b></li>
          <li><b>All content is processed in your browser</b>, ensuring maximum privacy.</li>
        </ul>
        <h2 className="text-2xl font-bold my-4 text-foreground">Desktop vs Mobile Experience</h2>
        <p className="mt-4">
          Thanks to responsive design, the tool delivers:
        </p>
        <ul className='list-disc pl-5 mt-4'>
          <li>A <strong>clutter-free interface</strong> for distraction-free writing.</li>
          <li><strong>Touch-friendly features</strong> on mobile.</li>
          <li><strong>Keyboard shortcuts</strong> and quick navigation on desktops.</li>
        </ul>
        <h2 className="text-2xl font-bold my-4 text-foreground">Supported Languages and Character Recognition</h2>
        <p className="mt-4">
          The word counter tool supports:
        </p>
        <ul className='list-disc pl-5 mt-4'>
          <li>All major world languages including English, Spanish, French, Arabic, and Hindi.</li>
          <li><strong>Unicode symbols</strong>, emoji, and special formatting characters.</li>
          <li>Copy-pasting from formatted editors like Google Docs or MS Word.</li>
        </ul>
        <h2 className="text-2xl font-bold my-4 text-foreground">Integrating Word Count into Your Workflow</h2>
        <ul className='list-disc pl-5 mt-4'>
          <li>Use the tool before finalizing a <strong>blog post</strong>.</li>
          <li>Measure the word count for <strong>SEO articles</strong>.</li>
          <li>Check length compliance for <strong>academic submissions</strong>.</li>
          <li>Optimize <strong>email marketing copy</strong> for engagement.</li>
        </ul>
        <h2 className="text-2xl font-bold my-4 text-foreground">Common Use Cases for Word Counter Tools</h2>
        <Table className='border border-gray-200 mt-4 rounded-sm'>
          <TableCaption>Common Use Cases for Word Counter Tools</TableCaption>
          <TableHeader className="bg-violet-500">
            <TableRow>
              <TableHead className="w-[300px] text-white">Use Case</TableHead>
              <TableHead className='text-white'>Why It Matters</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Essay Writing</TableCell>
              <TableCell>Stay within school word limits</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Resume Editing</TableCell>
              <TableCell>Ideal length for recruiters</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Blogging</TableCell>
              <TableCell>Match SEO-friendly word counts</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Ad Copywriting</TableCell>
              <TableCell>Meet platform character limits</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Social Media Posts</TableCell>
              <TableCell>Avoid truncation</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <h2 className="text-2xl font-bold my-4 text-foreground">Top Benefits of Using a Word Counter Tool Daily</h2>
        <ul className='list-disc pl-5 mt-4'>
          <li>Helps maintain <strong>writing discipline</strong>.</li>
          <li>Assists in hitting <strong>SEO and academic targets</strong>.</li>
          <li>Allows better <strong>time management</strong> through reading time estimation.</li>
          <li>Improves <strong>content editing</strong> with sentence and paragraph data.</li>
        </ul>
        <h2 className="text-2xl font-bold my-4 text-foreground">Accessibility and User Experience</h2>
        <ul className='list-disc pl-5 mt-4'>
          <li>Clean, <strong>ad-free interface</strong>.</li>
          <li>Supports <strong>dark/light modes</strong> for eye comfort.</li>
          <li><strong>Instant feedback</strong> without clicking.</li>
        </ul>
        <h2 className="text-2xl font-bold my-4 text-foreground">Is the Word Counter Tool Really Free?</h2>
        <p className="mt-4">
          Absolutely. The tool:
        </p>
        <ul className='list-disc pl-5 mt-4'>
          <li>Requires <strong>no login or subscription</strong>.</li>
          <li>Has <strong>zero hidden fees</strong>.</li>
          <li>Is <strong>open to all users</strong>, from hobbyists to professionals.</li>
        </ul>
        <h2 className="text-2xl font-bold my-4 text-foreground">How Accurate is the Word Counter Tool?</h2>
        <p className="mt-4">
          The tool uses <strong>advanced algorithms</strong> to:
        </p>
        <ul className='list-disc pl-5 mt-4'>
          <li>Count based on <strong>spaces, punctuation, and grammar rules</strong>.</li>
          <li>Recognize complex structures like <strong>hyphenated words and contractions</strong>.</li>
          <li>Update results in <strong>real-time with 99.9% accuracy</strong>.</li>
        </ul>
        <h2 className="text-2xl font-bold my-4 text-foreground">FAQs about Word Counter Tools</h2>
        <Accordion
          type="single"
          collapsible
          className="w-full"
          defaultValue="item-1"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger className='py-2 text-black'>1. Is the word counter accurate for all languages?</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <p>
                Yes, it supports multiple languages with high accuracy.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className='py-2 text-black'>2. Can I use it offline?</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <p>
                Currently, it&apos;s a web-based tool. Offline versions may be in development.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className='py-2 text-black'>3. Are there limits to how much I can paste?</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <p>
               Most tools handle up to several thousand words at once.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className='py-2 text-black'>4. Is my content saved or stored?</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <p>
               No. All content remains private and is not saved on any server.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger className='py-2 text-black'>5. Can I use it for professional writing?</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <p>
               Absolutely. Many authors and editors rely on it daily.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-6">
            <AccordionTrigger className='py-2 text-black'>6. Does it work on smartphones and tablets?</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <p>
               Yes, the tool is fully responsive and mobile-friendly.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <h2 className="text-2xl font-bold my-4 text-foreground">Final Thoughts on Using the Word Counter Tool</h2>
        <p className="mt-4">
          The <strong>Word Counter Tool</strong> is more than just a utility—it’s a digital assistant for writers, students, and content professionals. With <b>real-time stats, a clean interface, and total privacy</b>, it helps you write better, smarter, and faster.
        </p>
        <p className='mt-4'>
          Try the <strong>Word Counter Tool</strong> now and experience the convenience of smart, efficient content management!
        </p>
      </div>
    </>
  );
} 