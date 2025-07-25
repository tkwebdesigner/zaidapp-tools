import { ImageConverter } from '@/components/image-converter';
import type { Metadata } from 'next';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';

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
      <main>
        <div className="max-w-2xl mx-auto flex flex-col items-center justify-center text-center mt-8 mb-8">
          <Breadcrumb className="justify-center flex mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/convertor">Convert</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Image Converter</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gradient bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-2">Image Converter</h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Convert images between JPG, PNG, and WEBP formats in seconds without losing quality or installing any software or plugins!
          </p>
        </div>
        <div className="max-w-3xl mx-auto">
          <ImageConverter />
        </div>
      </main>
      <div className="mt-8 mx-auto text-base leading-relaxed text-muted-foreground max-w-3xl">
        <h2 className="text-2xl font-bold mb-4 text-foreground">About the Image Converter Tool</h2>
        <p>
          The Image Converter tool is a versatile utility that allows you to convert images between popular formats such as JPG, PNG, WebP, and SVG. Whether you’re a designer, developer, or everyday user, this tool makes it easy to adapt images for websites, social media, or personal projects. No software installation is required—everything happens instantly in your browser.
        </p>
        <p className="mt-4">
          To use the Image Converter, simply upload your image, select the desired output format, and click convert. The tool processes your image quickly and provides a download link for the converted file. It supports high-quality conversions and preserves important image properties like transparency and resolution.
        </p>
        <p className="mt-4">
          The tool’s intuitive interface and responsive design ensure a smooth experience on any device. You can convert multiple images in succession, making it ideal for batch processing. Privacy is guaranteed—your images are never stored or shared, and all conversions happen securely in your browser.
        </p>
        <p className="mt-4">
          The Image Converter is perfect for preparing images for websites, compressing files for faster loading, or converting graphics for use in different applications. It’s a valuable resource for students, professionals, and anyone who works with digital images.
        </p>
        <p className="mt-4">
          Best of all, the Image Converter is completely free to use. Try it now and experience the convenience of fast, secure image conversion!
        </p>
      </div>
    </>
  );
} 