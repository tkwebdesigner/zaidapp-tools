import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Web Tools - Text Analysis, Age Calculator & SEO Checker',
  description: 'A collection of useful web tools including Word Counter, Age Calculator, and SEO Checker.',
  keywords: 'word counter, age calculator, seo checker, web tools, text analysis',
  openGraph: {
    title: 'Web Tools - Text Analysis, Age Calculator & SEO Checker',
    description: 'A collection of useful web tools including Word Counter, Age Calculator, and SEO Checker.',
    type: 'website',
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