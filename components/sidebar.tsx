'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, X, Search, Image as ImageIcon, TextQuote, CalendarDays } from 'lucide-react';
import { motion } from 'framer-motion';

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
    icon: Search,
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
        <SheetContent side="left" className="w-[300px] p-0">
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">Web Tools</h2>
              {/* Remove duplicate close icon */}
            </div>
            <ScrollArea className="flex-1">
              <div className="p-4 space-y-2">
                {tools.map((tool) => {
                  const Icon = tool.icon;
                  const isActive = activeTool === tool.id;
                  return (
                    <Link
                      key={tool.id}
                      href={tool.href}
                      className={cn(
                        'flex items-center gap-3 p-4 rounded-xl transition-all duration-200 shadow-sm',
                        isActive
                          ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg scale-105'
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
                      <div className="flex flex-col">
                        <span className={cn('font-semibold text-base', isActive ? 'text-white' : '')}>{tool.name}</span>
                        <span className={cn('text-xs', isActive ? 'text-white/80' : 'text-muted-foreground')}>{tool.description}</span>
                      </div>
                      {isActive && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 rounded-xl pointer-events-none z-[-1] bg-gradient-to-r from-indigo-500 to-purple-500 opacity-30"
                          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        />
                      )}
                    </Link>
                  );
                })}
              </div>
            </ScrollArea>
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <aside className={cn(
        'hidden md:flex flex-col fixed top-25 left-6 z-40 w-[240px] md:w-[270px] h-[calc(100vh-5.5rem)] bg-card/80 border border-border rounded-2xl shadow-2xl backdrop-blur-lg p-2 md:p-3 transition-all duration-300',
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      )}>
        <h2 className="text-xl font-bold mb-6 text-foreground">Web Tools</h2>
        <ScrollArea className="flex-1">
          <div className="space-y-2">
            {tools.map((tool) => {
              const Icon = tool.icon;
              const isActive = activeTool === tool.id;
              return (
                <Link
                  key={tool.id}
                  href={tool.href}
                  className={cn(
                    'flex items-center gap-3 p-4 rounded-xl transition-all duration-200 shadow-sm',
                    isActive
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg scale-105'
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
                  <div className="flex flex-col">
                    <span className={cn('font-semibold text-base', isActive ? 'text-white' : '')}>{tool.name}</span>
                    <span className={cn('text-xs', isActive ? 'text-white/80' : 'text-muted-foreground')}>{tool.description}</span>
                  </div>
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 rounded-xl pointer-events-none z-[-1] bg-gradient-to-r from-indigo-500 to-purple-500 opacity-30"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </ScrollArea>
      </aside>
    </>
  );
} 