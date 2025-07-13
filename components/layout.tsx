'use client';

import { useState, useEffect } from 'react';
import { Sidebar } from '@/components/sidebar';
import { ThemeToggle } from '@/components/theme-toggle';
import { usePathname } from 'next/navigation';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Menu } from 'lucide-react';

export function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // Remove isSidebarOpen and custom sidebar logic
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const PAGE_TITLES: Record<string, string> = {
    '/word-counter': 'Word Counter',
    '/age-calculator': 'Age Calculator',
    '/seo-checker': 'SEO Checker',
    '/image-converter': 'Image Converter',
    '/sitemap-generator': 'Sitemap Generator',
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled ? 'bg-background/15 shadow-lg backdrop-blur-md' : 'bg-transparent'}`}>
        <div className="px-2 py-2 md:py-4">
          <Card className="w-full max-w-7xl mx-auto flex items-center justify-between gap-4 px-4 py-3 md:py-4 rounded-2xl border border-border bg-card/90 backdrop-blur-md">
            <div className="flex-1 flex items-center justify-start">
              <Link href="/" aria-label="Go to Home">
                <span className="text-2xl font-extrabold tracking-tight text-gradient bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent select-none cursor-pointer">
                  Web Tools
                </span>
              </Link>
            </div>
            <div className="flex items-center gap-2">
              {/* Sidebar toggle for mobile, only on non-home pages */}
              {!isHome && (
                <button
                  className="md:hidden mr-2 p-2 rounded-lg hover:bg-accent focus:outline-none focus:ring-2 focus:ring-primary"
                  onClick={() => setSidebarOpen(true)}
                  aria-label="Open sidebar menu"
                >
                  <Menu className="h-5 w-5" />
                </button>
              )}
              <ThemeToggle />
            </div>
          </Card>
        </div>
      </header>
      <div className="flex-1 flex flex-row max-w-full w-full mx-auto pt-4 md:pt-8 gap-2 sm:gap-4 md:gap-8 lg:gap-12 xl:gap-16">
        {/* Sidebar: responsive width, never overlaps, always visible on md+ */}
        {!isHome && (
          <nav className="relative z-30 flex-shrink-0">
            <div className="hidden md:block">
              <div className="w-48 sm:w-56 md:w-60 lg:w-64 xl:w-72">
                <Sidebar isOpen={true} />
              </div>
            </div>
            {/* Mobile sidebar Sheet, controlled by header button */}
            <div className="md:hidden">
              <Sidebar isOpen={sidebarOpen} setOpen={setSidebarOpen} />
            </div>
          </nav>
        )}
        {/* Main content: responsive max-width and padding */}
        <main className="flex-1 min-w-0 w-full max-w-5xl mx-auto">
          {isHome ? (
            children
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="bg-card/90 rounded-2xl shadow-2xl border border-border p-2 sm:p-4 md:p-6 lg:p-8 min-h-[70vh] flex flex-col gap-6"
            >
              <div className="mb-4">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gradient bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-2">
                  {PAGE_TITLES[pathname] || 'Web Tool'}
                </h1>
              </div>
              {children}
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
} 