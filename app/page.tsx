'use client';

import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  TextQuote, 
  CalendarDays, 
  Search, 
  Image as ImageIcon,
  ArrowRight,
  CheckCircle,
  Zap,
  Shield,
  Clock,
  BarChart3,
  Palette,
  Download,
  Globe,
  Target
} from 'lucide-react';
import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Skeleton } from '@/components/ui/skeleton';

const tools = [
  {
    id: 'word-counter',
    name: 'Word Counter',
    description: 'Count words, characters, sentences, and paragraphs with precision. Perfect for writers, students, and content creators.',
    features: [
      'Real-time word and character counting',
      'Sentence and paragraph analysis',
      'Reading and writing time estimation',
    ],
    icon: TextQuote,
    href: '/word-counter',
    image: '/images/word-counter.svg',
    imageAlt: 'Word Counter illustration',
    bg: 'from-blue-50 to-blue-100',
  },
  {
    id: 'age-calculator',
    name: 'Age Calculator',
    description: 'Calculate exact age, time differences, and important dates. Useful for planning, documentation, and personal records.',
    features: [
      'Precise age calculation',
      'Time difference calculator',
      'Date range analysis',
    ],
    icon: CalendarDays,
    href: '/age-calculator',
    image: '/images/age-calculator.svg',
    imageAlt: 'Age Calculator illustration',
    bg: 'from-green-50 to-green-100',
  },
  {
    id: 'seo-checker',
    name: 'SEO Checker',
    description: 'Analyze your website\'s SEO performance with comprehensive metrics and actionable recommendations.',
    features: [
      'Meta tag and content analysis',
      'Keyword density check',
      'Page speed and mobile insights',
    ],
    icon: Search,
    href: '/seo-checker',
    image: '/images/seo-checker.svg',
    imageAlt: 'SEO Checker illustration',
    bg: 'from-purple-50 to-purple-100',
  },
  {
    id: 'image-converter',
    name: 'Image Converter',
    description: 'Convert images between JPG, PNG, and WebP formats with high quality and fast processing.',
    features: [
      'Multiple format support',
      'Batch conversion',
      'Drag & drop interface',
    ],
    icon: ImageIcon,
    href: '/image-converter',
    image: '/images/image-converter.svg',
    imageAlt: 'Image Converter illustration',
    bg: 'from-orange-50 to-orange-100',
  },
];

const benefits = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'All tools are optimized for speed and efficiency'
  },
  {
    icon: Shield,
    title: 'Privacy First',
    description: 'Your data stays on your device, never uploaded to servers'
  },
  {
    icon: Globe,
    title: 'Always Available',
    description: 'Access your tools anytime, anywhere with no registration required'
  },
  {
    icon: Target,
    title: 'Professional Results',
    description: 'Get accurate, professional-grade results for all your needs'
  }
];

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const heroBgRef = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState(false); // Simulate loading for demo

  useEffect(() => {
    // Animate hero gradient background
    if (heroBgRef.current) {
      gsap.to(heroBgRef.current, {
        backgroundPosition: '200% 0',
        duration: 10,
        repeat: -1,
        ease: 'linear',
        backgroundSize: '400% 400%',
      });
    }
    sectionRefs.current.forEach((el) => {
      if (el) {
        gsap.fromTo(
          el,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    });
    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <>
      <Head>
        <title>Web Tools - Free Online Tools for Productivity</title>
        <meta name="description" content="A collection of free, modern, and mobile-friendly web tools for productivity, SEO, image conversion, and more." />
        <link rel="canonical" href={process.env.NEXT_PUBLIC_SITE_URL} />
      </Head>
      <main className="w-full min-h-screen bg-background">
        {/* Hero Section */}
        <header className="relative w-full min-h-[70vh] flex flex-col items-center justify-center px-4 overflow-hidden">
          {/* Animated Gradient BG */}
          <div
            ref={heroBgRef}
            className="absolute inset-0 -z-10 animate-none"
            style={{
              background: 'linear-gradient(120deg, #6366f1 0%, #a21caf 25%, #f472b6 50%, #fbbf24 75%, #38bdf8 100%)',
              backgroundSize: '400% 400%',
              backgroundPosition: '0% 0%',
              filter: 'blur(80px)',
              opacity: 0.8,
              transition: 'background-position 1s',
            }}
          />
          <div className="max-w-4xl mx-auto text-center relative flex flex-col items-center justify-center h-full">
            <Badge variant="secondary" className="mb-6 text-base px-4 py-2 font-semibold shadow-lg bg-white/80 text-black/80 backdrop-blur-md">
              🚀 Free Web Tools Collection
            </Badge>
            <h1 className="text-4xl md:text-7xl font-extrabold leading-tight mb-8">
              Professional Tools for{' '}
              <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent inline-block animate-gradient-x">
                Every Need
              </span>
            </h1>
            <p className="text-lg md:text-2xl text-black/70 dark:text-white/80 mb-10 max-w-2xl mx-auto font-medium">
              Discover our collection of powerful, free web tools designed to help you work smarter, not harder. From content analysis to image processing, we've got you covered.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold shadow-lg hover:from-indigo-600 hover:to-pink-600 hover:scale-105 transition-transform duration-200 border-0"
                asChild
              >
                <Link href="#tools">
                  Explore Tools
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/80 text-black border-0 font-semibold shadow-lg hover:bg-pink-500 hover:text-white hover:scale-105 transition-transform duration-200"
                asChild
              >
                <Link href="#features">
                  Learn More
                </Link>
              </Button>
            </div>
          </div>
        </header>

        {/* Tools Sections - Alternating */}
        <section id="tools" className="w-full">
          {loading ? (
            <div className="max-w-6xl mx-auto py-16">
              <Skeleton className="h-32 w-full mb-6" />
              <Skeleton className="h-32 w-full mb-6" />
              <Skeleton className="h-32 w-full mb-6" />
              <Skeleton className="h-32 w-full" />
            </div>
          ) : (
            tools.map((tool, idx) => (
              <section
                key={tool.id}
                ref={el => (sectionRefs.current[idx] = el)}
                className={`w-full py-16 md:py-24 px-4 bg-gradient-to-br ${tool.bg} dark:from-gray-900 dark:to-gray-800`}
                aria-labelledby={`tool-${tool.id}`}
              >
                <div className={`max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                  {/* Image/Illustration */}
                  <div className="flex-1 flex justify-center items-center">
                    <div className="w-full max-w-md aspect-square relative">
                      <Image
                        src={tool.image}
                        alt={tool.imageAlt || tool.name}
                        fill
                        className="object-contain drop-shadow-xl rounded-2xl animate-fade-in"
                        sizes="(max-width: 768px) 80vw, 400px"
                        priority={idx === 0}
                      />
                    </div>
                  </div>
                  {/* Content */}
                  <div className="flex-1 flex flex-col items-start justify-center">
                    <div className="flex items-center gap-3 mb-2">
                      <tool.icon className="h-8 w-8 text-primary" />
                      <h2 id={`tool-${tool.id}`} className="text-3xl md:text-4xl font-bold text-foreground">
                        {tool.name}
                      </h2>
                    </div>
                    <p className="text-lg text-muted-foreground mb-4">
                      {tool.description}
                    </p>
                    <ul className="mb-6 space-y-2">
                      {tool.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-muted-foreground">
                          <span className="inline-block w-2 h-2 rounded-full bg-primary/60" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button size="lg" asChild className="shadow-lg animate-bounce-once">
                      <Link href={tool.href}>
                        Try {tool.name}
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </section>
            ))
          )}
        </section>

        {/* Benefits Section */}
        <section id="features" className="py-20 bg-muted dark:bg-gray-900">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Why Choose Our Tools?
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                We believe in providing professional-grade tools that are accessible to everyone.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div key={index} className="text-center group">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4 group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {benefit.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary to-purple-600 dark:from-primary dark:to-purple-800 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-8 text-white/80">
              Choose any tool and start working efficiently. No signup required, no limits.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold shadow-lg hover:from-indigo-600 hover:to-pink-600 hover:scale-105 transition-transform duration-200 border-0"
                asChild
              >
                <Link href="/word-counter">
                  Start with Word Counter
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-indigo-600 text-white border-0 font-semibold shadow-lg hover:bg-pink-500 hover:text-white hover:scale-105 transition-transform duration-200"
                asChild
              >
                <Link href="/seo-checker">
                  Try SEO Checker
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-4 bg-background border-t border-border text-muted-foreground dark:bg-gray-950">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-foreground">Web Tools</h3>
                <p className="text-muted-foreground">
                  Professional tools for content creators, developers, and professionals.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-4 text-foreground">Tools</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li><Link href="/word-counter" className="hover:text-primary transition-colors">Word Counter</Link></li>
                  <li><Link href="/age-calculator" className="hover:text-primary transition-colors">Age Calculator</Link></li>
                  <li><Link href="/seo-checker" className="hover:text-primary transition-colors">SEO Checker</Link></li>
                  <li><Link href="/image-converter" className="hover:text-primary transition-colors">Image Converter</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4 text-foreground">Features</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li>Free to use</li>
                  <li>No registration</li>
                  <li>Privacy focused</li>
                  <li>Professional results</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4 text-foreground">Support</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li>Always available</li>
                  <li>Fast processing</li>
                  <li>Accurate results</li>
                  <li>Easy to use</li>
                </ul>
              </div>
            </div>
            <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
              <p>&copy; 2025 Web Tools. All rights reserved. Design & Development by <a className='underline text-blue-500' href='https://zaidapp.com'>ZaidApp</a></p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}