import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://localhost:3000';
  const robots = `
User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml
  `.trim();

  return new NextResponse(robots, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}