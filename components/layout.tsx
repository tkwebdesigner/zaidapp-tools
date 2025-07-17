'use client';

import { useState, useEffect } from 'react';
import { Sidebar } from '@/components/sidebar';
import { ThemeToggle } from '@/components/theme-toggle';
import { usePathname } from 'next/navigation';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Menu, Info, FileText, Shield, Mail, RefreshCcw, AlertTriangle } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink
} from '@/components/ui/navigation-menu';

export function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // Remove isSidebarOpen and custom sidebar logic
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';
  const infoPages = [
    '/about-us',
    '/contact-us',
    '/terms',
    '/privacy-policy',
    '/disclaimer',
    '/refund-policy',
  ];
  const isInfoPage = infoPages.includes(pathname);
  const noSidebarPages = ['/faq', '/testimonials'];

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

  const infoLinks = [
    { name: 'About Us', href: '/about-us', icon: Info },
    { name: 'Contact Us', href: '/contact-us', icon: Mail },
    { name: 'Terms & Conditions', href: '/terms', icon: FileText },
    { name: 'Privacy Policy', href: '/privacy-policy', icon: Shield },
    { name: 'Disclaimer', href: '/disclaimer', icon: AlertTriangle },
    { name: 'Refund Policy', href: '/refund-policy', icon: RefreshCcw },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled ? 'bg-background/15 shadow-lg backdrop-blur-md' : 'bg-transparent'}`}>
        <div className="px-2 py-2 md:py-4">
          <Card className="w-full max-w-[1920px] mx-auto flex items-center justify-between gap-4 px-4 py-3 md:py-4 rounded-2xl border border-border bg-card/90 backdrop-blur-md">
            {/* Only show toggler and theme toggle if sidebarOpen and on mobile */}
            {sidebarOpen ? (
              <div className="flex items-center gap-2 w-full justify-between lg:hidden">
                <button
                  className="lg:hidden mr-2 p-2 rounded-lg hover:bg-accent focus:outline-none focus:ring-2 focus:ring-primary"
                  onClick={() => setSidebarOpen(true)}
                  aria-label="Open sidebar menu"
                >
                  <Menu className="h-5 w-5" />
                </button>
                <ThemeToggle />
              </div>
            ) : (
              <>
                <div className="flex-1 flex items-center justify-start">
                  <Link href="/" aria-label="Go to Home" className="flex items-center gap-2">
                    <img src="/images/app-logo.svg" alt="Logo" className="h-8 w-8" />
                    <span className="text-2xl font-extrabold tracking-tight text-gradient bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent select-none cursor-pointer">
                      Web Tools
                    </span>
                  </Link>
                </div>
                {/* Header menu start */}
                <div className="items-center gap-4 lg:flex hidden">
                  <NavigationMenu>
                    <NavigationMenuList>
                      <NavigationMenuItem>
                        <NavigationMenuLink href="/" className="px-4 py-2">Home</NavigationMenuLink>
                      </NavigationMenuItem>
                      <NavigationMenuItem>
                        <NavigationMenuLink href="/about-us" className="px-4 py-2">About</NavigationMenuLink>
                      </NavigationMenuItem>
                      <NavigationMenuItem>
                        <NavigationMenuTrigger>Convertor</NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <div className="grid grid-cols-1 gap-2 p-4 min-w-[220px]">
                            <NavigationMenuLink href="/word-counter" className="block px-2 py-1 rounded hover:bg-accent">Word Counter</NavigationMenuLink>
                            <NavigationMenuLink href="/age-calculator" className="block px-2 py-1 rounded hover:bg-accent">Age Calculator</NavigationMenuLink>
                            <NavigationMenuLink href="/seo-checker" className="block px-2 py-1 rounded hover:bg-accent">SEO Checker</NavigationMenuLink>
                            <NavigationMenuLink href="/image-converter" className="block px-2 py-1 rounded hover:bg-accent">Image Converter</NavigationMenuLink>
                            <NavigationMenuLink href="/sitemap-generator" className="block px-2 py-1 rounded hover:bg-accent">Sitemap Generator</NavigationMenuLink>
                            <NavigationMenuLink href="/faq-schema-generator" className="block px-2 py-1 rounded hover:bg-accent">FAQ Schema Generator</NavigationMenuLink>
                            <NavigationMenuLink href="/css-minifier" className="block px-2 py-1 rounded hover:bg-accent">CSS Minifier</NavigationMenuLink>
                            <NavigationMenuLink href="/html-beautifier" className="block px-2 py-1 rounded hover:bg-accent">HTML Beautifier</NavigationMenuLink>
                          </div>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                      <NavigationMenuItem>
                        <NavigationMenuLink href="/faq" className="px-4 py-2">Faq</NavigationMenuLink>
                      </NavigationMenuItem>
                      <NavigationMenuItem>
                        <NavigationMenuLink href="/testimonials" className="px-4 py-2">Testimonials</NavigationMenuLink>
                      </NavigationMenuItem>
                      <NavigationMenuItem>
                      <NavigationMenuLink href="/contact-us" className="px-4 py-2">Contact</NavigationMenuLink>
                      </NavigationMenuItem>                      
                    </NavigationMenuList>
                  </NavigationMenu>
                </div>
                {/* Header menu end */}
                <div className="flex items-center gap-2">
                  <button
                    className="lg:hidden mr-2 p-2 rounded-lg hover:bg-accent focus:outline-none focus:ring-2 focus:ring-primary"
                    onClick={() => setSidebarOpen(true)}
                    aria-label="Open sidebar menu"
                  >
                    <Menu className="h-5 w-5" />
                  </button>
                  <ThemeToggle />
                </div>
              </>
            )}
          </Card>
        </div>
      </header>
      <div className={
        `flex-1 flex flex-row w-full max-w-[1920px] ${isHome ? 'px-0' : 'px-3'} mb-3 mx-auto pt-4 md:pt-8 gap-2 sm:gap-4 md:gap-8 lg:gap-12 xl:gap-16`
      }>
        {/* Sidebar: fixed width, main content flex-1 */}
        {!isHome && !isInfoPage && !noSidebarPages.includes(pathname) && (
          <nav className="relative z-30 flex-shrink-0 w-[80px]">
            <div className="hidden md:block">
              <Sidebar isOpen={true} />
            </div>
            {/* Mobile sidebar Sheet, controlled by header button */}
            <div className="md:hidden">
              <Sidebar isOpen={sidebarOpen} setOpen={setSidebarOpen} />
            </div>
          </nav>
        )}
        {/* Main content: flex-1, full width minus sidebar */}
        <main className={
          (isHome
            ? 'flex-1 min-w-0 w-full'
            : isInfoPage
              ? 'flex-1 min-w-0 w-full max-w-4xl mx-auto px-2 md:px-0'
              : 'flex-1 min-w-0 w-full') +
          ' pb-24 md:pb-0'
        }>
          {isHome ? (
            children
          ) : isInfoPage ? (
            <div className="min-h-[70vh] flex flex-col gap-6">
              {children}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="bg-card/90 rounded-2xl shadow-2xl border border-border p-2 sm:p-4 md:p-6 lg:p-8 min-h-[70vh] flex flex-col gap-6"
            >
              <div className="mb-4">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gradient bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-2">
                  {PAGE_TITLES[pathname]}
                </h1>
              </div>
              {children}
            </motion.div>
          )}
        </main>
      </div>
      <footer className="w-full max-w-[1920px] mx-auto mt-auto border-t border-border bg-card/80 py-6 px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-muted-foreground z-50 relative backdrop-blur-md">
        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
          {infoLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link key={link.href} href={link.href} className="flex items-center gap-2 hover:text-primary transition-colors text-sm font-medium">
                <Icon className="h-4 w-4" />
                {link.name}
              </Link>
            );
          })}
        </div>
        <div className="text-xs text-center md:text-right mt-2 md:mt-0">
          &copy; {new Date().getFullYear()} Web Tools. All rights reserved. Design & Development by <a className='underline text-blue-500' href='https://zaidapp.com'>ZaidApp</a>
        </div>
      </footer>
    </div>
  );
} 