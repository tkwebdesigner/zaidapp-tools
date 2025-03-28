import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: 'Web Tools - Text Analysis, Age Calculator & SEO Checker',
  description: 'A collection of useful web tools including Word Counter, Age Calculator, and SEO Checker.',
  keywords: 'word counter, age calculator, seo checker, web tools, text analysis',
  openGraph: {
    title: 'Web Tools - Text Analysis, Age Calculator & SEO Checker',
    description: 'A collection of useful web tools including Word Counter, Age Calculator, and SEO Checker.',
    type: 'website',
    url: '/', // This will be resolved relative to metadataBase
    images: [
      {
        url: '/og-image.jpg', // This path will be relative to metadataBase
        width: 1200,
        height: 630,
        alt: 'Web Tools',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Web Tools - Text Analysis, Age Calculator & SEO Checker',
    description: 'A collection of useful web tools including Word Counter, Age Calculator, and SEO Checker.',
    images: ['/twitter-image.jpg'], // This path will be relative to metadataBase
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}