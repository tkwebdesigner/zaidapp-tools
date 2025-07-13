import { ImageConverter } from '@/components/image-converter';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Image Converter - Convert JPG, PNG, WebP Formats',
  description: 'Free online image converter tool. Convert images between JPG, PNG, and WebP formats with high quality and fast processing. Batch conversion supported.',
  keywords: 'image converter, jpg to png, png to jpg, webp converter, image format converter, online image converter',
  openGraph: {
    title: 'Image Converter - Convert JPG, PNG, WebP Formats',
    description: 'Free online image converter tool. Convert images between JPG, PNG, and WebP formats with high quality and fast processing.',
    url: '/image-converter',
  },
  twitter: {
    title: 'Image Converter - Convert JPG, PNG, WebP Formats',
    description: 'Free online image converter tool. Convert images between JPG, PNG, and WebP formats with high quality and fast processing.',
  },
  alternates: {
    canonical: '/image-converter',
  },
};

export default function ImageConverterPage() {
  return <main><ImageConverter /></main>;
} 