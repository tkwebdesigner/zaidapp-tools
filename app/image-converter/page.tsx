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
    images: [
      {
        url: '/sharing-images/image-convertor-tool.webp',
        width: 1200,
        height: 630,
        alt: 'Image Converter Tool',
        type: 'image/webp',
      },
    ],
  },
  twitter: {
    title: 'Image Converter - Convert JPG, PNG, WebP Formats',
    description: 'Free online image converter tool. Convert images between JPG, PNG, and WebP formats with high quality and fast processing.',
    images: ['/sharing-images/image-convertor-tool.webp'],
  },
  alternates: {
    canonical: '/image-converter',
  },
};

export default function ImageConverterPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Image Converter",
            "description": "Free online image converter tool. Convert images between JPG, PNG, and WebP formats with high quality and fast processing.",
            "image": "/sharing-images/image-convertor-tool.webp",
            "url": `${siteUrl}/image-converter`
          })
        }}
      />
      <main><ImageConverter /></main>
    </>
  );
} 