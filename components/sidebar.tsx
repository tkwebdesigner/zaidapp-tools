'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, X, Search, Image as ImageIcon, TextQuote, CalendarDays, Info, FileText, Shield, Mail, RefreshCcw, AlertTriangle, Code, Braces, ListChecks } from 'lucide-react';
import { motion } from 'framer-motion';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface Tool {
  id: string;
  name: string;
  href: string;
  description: string;
  icon: React.ElementType;
}

const tools: Tool[] = [
  {
    id: 'word-counter',
    name: 'Word Counter',
    href: '/word-counter',
    description: 'Count words, characters, and more',
    icon: TextQuote,
  },
  {
    id: 'age-calculator',
    name: 'Age Calculator',
    href: '/age-calculator',
    description: 'Calculate age and time differences',
    icon: CalendarDays,
  },
  {
    id: 'seo-checker',
    name: 'SEO Checker',
    href: '/seo-checker',
    description: 'Analyze your website\'s SEO performance',
    icon: Search,
  },
  {
    id: 'image-converter',
    name: 'Image Converter',
    href: '/image-converter',
    description: 'Convert images between different formats',
    icon: ImageIcon,
  },
  {
    id: 'sitemap-generator',
    name: 'Sitemap Generator',
    href: '/sitemap-generator',
    description: 'Generate HTML/XML sitemaps for any website',
    icon: FileText,
  },
  {
    id: 'faq-schema-generator',
    name: 'FAQ Schema Generator',
    href: '/faq-schema-generator',
    description: 'Generate FAQ JSON-LD schema for SEO',
    icon: ListChecks,
  },
  {
    id: 'css-minifier',
    name: 'CSS Minifier',
    href: '/css-minifier',
    description: 'Minify your CSS code',
    icon: Braces,
  },
  {
    id: 'html-beautifier',
    name: 'HTML Beautifier',
    href: '/html-beautifier',
    description: 'Beautify and format HTML code',
    icon: Code,
  },
];

interface SidebarProps {
  isOpen: boolean;
  setOpen?: (open: boolean) => void;
}

export function Sidebar({ isOpen, setOpen }: SidebarProps) {
  const pathname = usePathname();
  const activeTool = tools.find(tool => pathname === tool.href)?.id || 'word-counter';
  const [internalOpen, internalSetOpen] = useState(false);
  const controlledOpen = typeof setOpen === 'function';
  const open = controlledOpen ? isOpen : internalOpen;
  const handleSetOpen = controlledOpen ? setOpen! : internalSetOpen;
  // Auto-close Sheet on route change
  useEffect(() => {
    handleSetOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Mobile Sidebar */}
      <Sheet open={open} onOpenChange={handleSetOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="hidden md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle sidebar</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[80px] p-0 flex flex-col items-center">
          <div className="flex h-full flex-col items-center">
            <div className="flex items-center justify-center p-4 border-b">
              <h2 className="text-lg font-semibold">Web Tools</h2>
            </div>
            <ScrollArea className="flex-1 w-full">
              <div className="p-4 space-y-4 flex flex-col items-center">
                <TooltipProvider>
                  {tools.map((tool) => {
                    const Icon = tool.icon;
                    const isActive = activeTool === tool.id;
                    return (
                      <Tooltip key={tool.id}>
                        <TooltipTrigger asChild>
                          <Link
                            href={tool.href}
                            className={cn(
                              'flex items-center justify-center p-3 rounded-xl transition-all duration-200 shadow-sm',
                              isActive
                                ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg scale-110'
                                : 'bg-card/80 hover:bg-accent/60 text-foreground',
                              'group relative'
                            )}
                            style={{ boxShadow: isActive ? '0 4px 24px 0 rgba(99,102,241,0.15)' : undefined }}
                          >
                            <motion.span
                              initial={false}
                              animate={isActive ? { scale: 1.2, rotate: 8 } : { scale: 1, rotate: 0 }}
                              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                              className="flex items-center justify-center"
                            >
                              <Icon className={cn('h-6 w-6', isActive ? 'text-white drop-shadow-lg' : 'text-primary group-hover:text-indigo-600')} />
                            </motion.span>
                          </Link>
                        </TooltipTrigger>
                        <TooltipContent side="left" className="text-sm font-semibold">
                          {tool.name}
                        </TooltipContent>
                      </Tooltip>
                    );
                  })}
                </TooltipProvider>
              </div>
            </ScrollArea>
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <aside className={cn(
        'hidden md:flex flex-col w-[80px] h-[calc(100vh-7rem)] bg-card/80 border border-border rounded-2xl shadow-2xl backdrop-blur-lg p-2 transition-all duration-300 items-center',
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      )}>
        <ScrollArea className="flex-1 w-full">
          <div className="space-y-4 flex flex-col items-center pt-2">
            <TooltipProvider>
              {tools.map((tool) => {
                const Icon = tool.icon;
                const isActive = activeTool === tool.id;
                return (
                  <Tooltip key={tool.id}>
                    <TooltipTrigger asChild>
                      <Link
                        href={tool.href}
                        className={cn(
                          'flex items-center justify-center p-3 rounded-xl transition-all duration-200 shadow-sm',
                          isActive
                            ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg scale-110'
                            : 'bg-card/80 hover:bg-accent/60 text-foreground',
                          'group relative'
                        )}
                        style={{ boxShadow: isActive ? '0 4px 24px 0 rgba(99,102,241,0.15)' : undefined }}
                      >
                        <motion.span
                          initial={false}
                          animate={isActive ? { scale: 1.2, rotate: 8 } : { scale: 1, rotate: 0 }}
                          transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                          className="flex items-center justify-center"
                        >
                          <Icon className={cn('h-6 w-6', isActive ? 'text-white drop-shadow-lg' : 'text-primary group-hover:text-indigo-600')} />
                        </motion.span>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="text-sm font-semibold">
                      {tool.name}
                    </TooltipContent>
                  </Tooltip>
                );
              })}
            </TooltipProvider>
          </div>
        </ScrollArea>
      </aside>
    </>
  );
} 