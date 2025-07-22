import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { TextQuote, CalendarDays, Search, Image as ImageIcon, FileText, ListChecks, Braces, Code } from 'lucide-react';

const tools = [
  {
    id: 'word-counter',
    name: 'Word Counter',
    href: '/word-counter',
    icon: TextQuote,
  },
  {
    id: 'age-calculator',
    name: 'Age Calculator',
    href: '/age-calculator',
    icon: CalendarDays,
  },
  {
    id: 'seo-checker',
    name: 'SEO Checker',
    href: '/seo-checker',
    icon: Search,
  },
  {
    id: 'image-converter',
    name: 'Image Converter',
    href: '/image-converter',
    icon: ImageIcon,
  },
  {
    id: 'sitemap-generator',
    name: 'Sitemap Generator',
    href: '/sitemap-generator',
    icon: FileText,
  },
  {
    id: 'faq-schema-generator',
    name: 'FAQ Schema Generator',
    href: '/faq-schema-generator',
    icon: ListChecks,
  },
  {
    id: 'css-minifier',
    name: 'CSS Minifier',
    href: '/css-minifier',
    icon: Braces,
  },
  {
    id: 'html-beautifier',
    name: 'HTML Beautifier',
    href: '/html-beautifier',
    icon: Code,
  },
];

export default function ConvertorPage() {
  return (
    <main className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">All Tools</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <Link
              key={tool.id}
              href={tool.href}
              className={cn(
                'flex flex-col items-center justify-center p-6 rounded-xl shadow-md bg-card hover:bg-accent transition group border border-border',
                'hover:scale-105 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none'
              )}
            >
              <Icon className="h-10 w-10 mb-3 text-indigo-600 group-hover:text-purple-600 transition" />
              <span className="font-medium text-base text-center text-foreground group-hover:text-indigo-700 transition">
                {tool.name}
              </span>
            </Link>
          );
        })}
      </div>
    </main>
  );
} 