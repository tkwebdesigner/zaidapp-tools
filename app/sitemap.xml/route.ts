import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://localhost:3000';
  const urls = [
    { loc: `${baseUrl}/`, lastmod: new Date().toISOString(), priority: '1.0' },
    { loc: `${baseUrl}/about-us`, lastmod: new Date().toISOString(), priority: '0.8' },
    { loc: `${baseUrl}/contact-us`, lastmod: new Date().toISOString(), priority: '0.8' },
    { loc: `${baseUrl}/convertor`, lastmod: new Date().toISOString(), priority: '0.8' },
    { loc: `${baseUrl}/disclaimer`, lastmod: new Date().toISOString(), priority: '0.8' },
    { loc: `${baseUrl}/privacy-policy`, lastmod: new Date().toISOString(), priority: '0.8' },
    { loc: `${baseUrl}/refund-policy`, lastmod: new Date().toISOString(), priority: '0.8' },
    { loc: `${baseUrl}/terms`, lastmod: new Date().toISOString(), priority: '0.8' },
    { loc: `${baseUrl}/age-calculator`, lastmod: new Date().toISOString(), priority: '0.8' },
    { loc: `${baseUrl}/image-converter`, lastmod: new Date().toISOString(), priority: '0.8' },
    { loc: `${baseUrl}/seo-checker`, lastmod: new Date().toISOString(), priority: '0.8' },
    { loc: `${baseUrl}/sitemap-generator`, lastmod: new Date().toISOString(), priority: '0.8' },
    { loc: `${baseUrl}/word-counter`, lastmod: new Date().toISOString(), priority: '0.8' },
    { loc: `${baseUrl}/faq`, lastmod: new Date().toISOString(), priority: '0.8'},
    { loc: `${baseUrl}/testimonials`, lastmod: new Date().toISOString(), priority: '0.8'},
    { loc: `${baseUrl}/faq-schema-generator`, lastmod: new Date().toISOString(), priority: '0.8'},
    { loc: `${baseUrl}/css-minifier`, lastmod: new Date().toISOString(), priority: '0.8'},
    { loc: `${baseUrl}/html-beautifier`, lastmod: new Date().toISOString(), priority: '0.8'},
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map(
      (url) => `\n  <url>\n    <loc>${url.loc}</loc>\n    <lastmod>${url.lastmod}</lastmod>\n    <priority>${url.priority}</priority>\n  </url>`
    )
    .join('')}\n</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}