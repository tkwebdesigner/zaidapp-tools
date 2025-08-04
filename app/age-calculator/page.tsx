import { AgeCalculator } from '@/components/age-calculator';
import type { Metadata } from 'next';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Age Calculator - Calculate Age & Time Differences',
  description: 'Free online age calculator tool. Calculate exact age, time differences, and important dates. Useful for planning, documentation, and personal records.',
  keywords: 'age calculator, date calculator, time difference, age calculation tool, birthday calculator',
  openGraph: {
    title: 'Age Calculator - Calculate Age & Time Differences',
    description: 'Free online age calculator tool. Calculate exact age, time differences, and important dates.',
    url: '/age-calculator',
    images: [
      {
        url: '/sharing-images/bith-date-calculator.webp',
        width: 1200,
        height: 630,
        alt: 'Age Calculator Tool',
        type: 'image/webp',
      },
    ],
  },
  twitter: {
    title: 'Age Calculator - Calculate Age & Time Differences',
    description: 'Free online age calculator tool. Calculate exact age, time differences, and important dates.',
    images: ['/sharing-images/bith-date-calculator.webp'],
  },
  alternates: {
    canonical: '/age-calculator',
  },
};

export default function AgeCalculatorPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Age Calculator",
            "description": "Free online age calculator tool. Calculate exact age, time differences, and important dates.",
            "image": "/sharing-images/bith-date-calculator.webp",
            "url": `${siteUrl}/age-calculator`
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
                <BreadcrumbLink href="/convertor">Tools</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Age Calculator</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gradient bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-2">Age Calculator</h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Free online age calculator tool. Calculate exact age, time differences, and important dates. Useful for planning, documentation, and personal records.
          </p>
        </div>
        <div className="max-w-3xl mx-auto">
          <AgeCalculator />
        </div>
      </main>
      <div className="mt-8 mx-auto text-base leading-relaxed text-muted-foreground">
        <h2 className="text-2xl font-bold mb-4 text-foreground">About the Age Calculator Tool</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5'>
          <Image className='rounded-lg shadow-sm border' src={'/sharing-images/bith-date-calculator.webp'} alt='Age Calculator Tool' title='Age Calculator Tool' width={1200} height={675} />
          <div>
            <p>
              The Age Calculator tool is a simple yet powerful utility that helps you determine your exact age in years, months, and days. Whether you need to calculate your age for official documents, plan a birthday celebration, or simply satisfy your curiosity, this tool provides instant and accurate results. It’s also useful for parents, teachers, and HR professionals who need to verify ages for various purposes.
            </p>
            <p className="mt-4">
              Using the Age Calculator is straightforward—just enter your birth date, and the tool will instantly display your age. The calculation takes into account leap years and varying month lengths, ensuring precision. This makes it ideal for use in academic, professional, and personal contexts.
            </p>
          </div>
        </div>
        <p className="mt-4">
          The tool is designed with user experience in mind. Its clean interface and responsive design make it accessible on any device, from smartphones to desktops. There’s no need to sign up or provide any personal information; your data is never stored or shared, ensuring complete privacy.
        </p>
        <p className="mt-4">
          In addition to basic age calculation, the tool can be used to determine the time elapsed between two dates, making it useful for project planning, event management, and more. Whether you’re a student learning about dates and time, a professional managing deadlines, or someone planning a special occasion, the Age Calculator is a reliable companion.
        </p>
        <p className="mt-4">
          Best of all, the Age Calculator is completely free to use. Try it today and discover how easy it is to calculate ages and date differences with just a few clicks!
        </p>
      </div>
    </>
  );
} 