import { SEOChecker } from '@/components/seo-checker';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SEO Checker - Analyze Website SEO Performance',
  description: 'Free online SEO checker tool. Analyze your website\'s SEO performance with comprehensive metrics and actionable recommendations for better search rankings.',
  keywords: 'seo checker, seo analyzer, website seo, search engine optimization, seo tool, meta tag analyzer',
  openGraph: {
    title: 'SEO Checker - Analyze Website SEO Performance',
    description: 'Free online SEO checker tool. Analyze your website\'s SEO performance with comprehensive metrics and actionable recommendations.',
    url: '/seo-checker',
    images: [
      {
        url: '/sharing-images/seo-checker-tool.webp',
        width: 1200,
        height: 630,
        alt: 'SEO Checker Tool',
        type: 'image/webp',
      },
    ],
  },
  twitter: {
    title: 'SEO Checker - Analyze Website SEO Performance',
    description: 'Free online SEO checker tool. Analyze your website\'s SEO performance with comprehensive metrics and actionable recommendations.',
    images: ['/sharing-images/seo-checker-tool.webp'],
  },
  alternates: {
    canonical: '/seo-checker',
  },
};

export default function SEOCheckerPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "SEO Checker",
            "description": "Free online SEO checker tool. Analyze your website's SEO performance with comprehensive metrics and actionable recommendations.",
            "image": "/sharing-images/seo-checker-tool.webp",
            "url": `${siteUrl}/seo-checker`
          })
        }}
      />
      <main><SEOChecker /></main>
      <div className="mt-4 mx-auto text-base leading-relaxed text-muted-foreground">
        <h2 className="text-2xl font-bold mb-4 text-foreground">About the SEO Checker Tool</h2>
        <p>
          The SEO Checker tool is designed to help website owners, marketers, and developers optimize their sites for search engines. With just a few clicks, you can analyze your website’s SEO performance and receive actionable insights to improve your rankings. The tool checks for essential SEO factors such as meta tags, headings, keyword usage, mobile-friendliness, and page speed.
        </p>
        <p className="mt-4">
          Using the SEO Checker is easy—simply enter your website URL, and the tool will scan your site and provide a detailed report. The results highlight strengths and areas for improvement, making it simple to prioritize your SEO efforts. Whether you’re a beginner or an experienced SEO professional, this tool offers valuable guidance for boosting your site’s visibility.
        </p>
        <p className="mt-4">
          The tool’s user-friendly interface presents information in a clear, organized manner. You’ll find recommendations for on-page SEO, technical SEO, and content optimization. The responsive design ensures you can use the tool on any device, and your data is never stored or shared, maintaining your privacy.
        </p>
        <p className="mt-4">
          The SEO Checker is perfect for regular site audits, competitor analysis, and ongoing optimization. It’s a must-have for bloggers, business owners, webmasters, and anyone looking to improve their website’s search engine performance. Best of all, it’s completely free to use—no registration required.
        </p>
        <p className="mt-4">
          Start using the SEO Checker today and take the first step toward higher search rankings and increased website traffic!
        </p>
      </div>
    </>
  );
} 