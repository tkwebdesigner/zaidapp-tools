'use client';

import { useState } from 'react';
import { WordCounter } from '@/components/word-counter';
import { AgeCalculator } from '@/components/age-calculator';
import { SEOChecker } from '@/components/seo-checker';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { 
  TextQuote, 
  CalendarDays, 
  Search,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import Link from 'next/link';

const tabs = [
  { id: 'word-counter', name: 'Word Counter', icon: TextQuote, component: WordCounter },
  { id: 'age-calculator', name: 'Age Calculator', icon: CalendarDays, component: AgeCalculator },
  { id: 'seo-checker', name: 'SEO Checker', icon: Search, component: SEOChecker },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState('word-counter');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || WordCounter;

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <div className={`relative ${isSidebarOpen ? 'w-64' : 'w-0'} transition-all duration-300 ease-in-out`}>
        <div className={`fixed top-0 left-0 h-full bg-card border-r ${isSidebarOpen ? 'w-64' : 'w-0'} overflow-hidden transition-all duration-300 ease-in-out`}>
          <div className="p-4">
            <h1 className="text-xl font-bold mb-6">ZaidApp Tools</h1>
            <div className="space-y-2">
              {tabs.map((tab) => (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? 'secondary' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setActiveTab(tab.id)}
                >
                  <tab.icon className="mr-2 h-4 w-4" />
                  {tab.name}
                </Button>
              ))}
            </div>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 -right-10 z-50"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? (
            <ChevronLeft className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <div className="p-4 md:p-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold">
                {tabs.find(tab => tab.id === activeTab)?.name}
              </h1>
              <ThemeToggle />
            </div>
            <ActiveComponent />
          </div>
        </div>
        <div className='flex justify-center border-t border-b border-gray-100 dark:border-[#262626] py-2'>
          <p className='text-black dark:text-gray-300'>Design &amp; Development by <Link className='font-medium text-blue-600 dark:text-gray-300 hover:text-indigo-700' href="https://tofiquekhan.com/" target='_blank'>Tofique Khan</Link></p>
        </div>
      </div>
    </div>
  );
}