import { AgeCalculator } from '@/components/age-calculator';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Age Calculator - Calculate Age & Time Differences',
  description: 'Free online age calculator tool. Calculate exact age, time differences, and important dates. Useful for planning, documentation, and personal records.',
  keywords: 'age calculator, date calculator, time difference, age calculation tool, birthday calculator',
  openGraph: {
    title: 'Age Calculator - Calculate Age & Time Differences',
    description: 'Free online age calculator tool. Calculate exact age, time differences, and important dates.',
    url: '/age-calculator',
  },
  twitter: {
    title: 'Age Calculator - Calculate Age & Time Differences',
    description: 'Free online age calculator tool. Calculate exact age, time differences, and important dates.',
  },
  alternates: {
    canonical: '/age-calculator',
  },
};

export default function AgeCalculatorPage() {
  return <main><AgeCalculator /></main>;
} 