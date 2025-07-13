import { NextRequest, NextResponse } from "next/server";
import fetch from "node-fetch";
import * as cheerio from "cheerio";

// In-memory job store (for demo; use Redis or DB for production)
const jobs: Record<string, {
  status: 'pending' | 'in_progress' | 'done' | 'error',
  progress: number,
  total: number,
  links: Set<string>,
  images: Set<string>,
  pages?: Array<{ url: string; title: string; images: string[] }>,
  error?: string,
  sitemap?: string,
  type?: SitemapType,
  rootDomain?: string,
}> = {};

type SitemapType = "html" | "xml" | "xml_images";

function isInternalLink(link: string, rootDomain: string) {
  try {
    const url = new URL(link);
    return url.hostname === rootDomain;
  } catch {
    return false;
  }
}

function getPriority(url: string, rootUrl: string): string {
  try {
    const root = new URL(rootUrl);
    const u = new URL(url);
    if (u.pathname === '/' || u.href === root.href) return '1.0';
    const rel = u.pathname.replace(/\/+/g, '/').replace(/\/$/, '');
    const depth = rel.split('/').filter(Boolean).length;
    if (depth === 1) return '0.8';
    if (depth > 1) return '0.5';
    return '0.5';
  } catch {
    return '0.5';
  }
}

async function crawlRecursive(startUrl: string, type: SitemapType, jobId: string) {
  const rootDomain = new URL(startUrl).hostname;
  const toVisit: string[] = [startUrl];
  const visited = new Set<string>();
  const images = new Set<string>();
  const pages: Array<{ url: string; title: string; images: string[] }> = [];
  jobs[jobId].status = 'in_progress';
  jobs[jobId].progress = 0;
  jobs[jobId].total = 1;
  jobs[jobId].links = new Set([startUrl]);
  jobs[jobId].images = images;
  jobs[jobId].rootDomain = rootDomain;
  jobs[jobId].pages = pages;

  while (toVisit.length > 0) {
    const url = toVisit.shift()!;
    if (visited.has(url)) continue;
    visited.add(url);
    jobs[jobId].progress = visited.size;
    try {
      const res = await fetch(url);
      if (!res.ok) continue;
      const html = await res.text();
      const $ = cheerio.load(html);
      // Collect page title
      const title = $('title').text() || url;
      // Collect images for this page
      const pageImages: string[] = [];
      $("img[src]").each((_, el) => {
        let src = $(el).attr("src") || "";
        if (src.startsWith("/")) src = new URL(src, url).href;
        if (src.startsWith("http") && isInternalLink(src, rootDomain)) {
          images.add(src);
          pageImages.push(src);
        }
      });
      pages.push({ url, title, images: pageImages });
      // Collect internal links
      $("a[href]").each((_, el) => {
        let href = $(el).attr("href") || "";
        if (href.startsWith("/")) href = new URL(href, url).href;
        if (href.startsWith("http") && isInternalLink(href, rootDomain)) {
          if (!visited.has(href) && !toVisit.includes(href)) {
            toVisit.push(href);
            jobs[jobId].links.add(href);
            jobs[jobId].total++;
          }
        }
      });
    } catch {
      // Ignore fetch errors
      continue;
    }
  }
  // Generate sitemap
  let sitemap = "";
  const linksArr = Array.from(jobs[jobId].links);
  if (type === "html") sitemap = generateHtmlSitemap(linksArr);
  else if (type === "xml") sitemap = generateXmlSitemap(linksArr, startUrl);
  else if (type === "xml_images") sitemap = generateXmlSitemapWithImages(linksArr, Array.from(images), startUrl);
  jobs[jobId].sitemap = sitemap;
  jobs[jobId].status = 'done';
}

function generateHtmlSitemap(links: string[]): string {
  return `<ul>\n${links.map(link => `<li><a href="${link}">${link}</a></li>`).join("\n")}\n</ul>`;
}

function generateXmlSitemap(links: string[], rootUrl: string): string {
  const now = new Date().toISOString();
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${links.map(link => `<url><loc>${link}</loc><lastmod>${now}</lastmod><priority>${getPriority(link, rootUrl)}</priority></url>`).join("\n")}\n</urlset>`;
}

function generateXmlSitemapWithImages(links: string[], images: string[], rootUrl: string): string {
  const now = new Date().toISOString();
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${links.map(link => `<url><loc>${link}</loc><lastmod>${now}</lastmod><priority>${getPriority(link, rootUrl)}</priority>${images.map(img => `<image:image><image:loc>${img}</image:loc></image:image>`).join("")}</url>`).join("\n")}\n</urlset>`;
}

// Add a simple job ID generator
function generateJobId() {
  return (
    Date.now().toString(36) + Math.random().toString(36).substr(2, 8)
  );
}

export async function POST(req: NextRequest) {
  const { url, type }: { url: string; type: SitemapType } = await req.json();
  if (!url || !type) return NextResponse.json({ error: "Missing url or type" }, { status: 400 });
  const jobId = generateJobId();
  jobs[jobId] = {
    status: 'pending',
    progress: 0,
    total: 1,
    links: new Set(),
    images: new Set(),
    type,
    rootDomain: new URL(url).hostname,
  };
  // Start crawl (async, don't await)
  crawlRecursive(url, type, jobId);
  return NextResponse.json({ jobId });
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const jobId = searchParams.get('jobId');
  if (!jobId || !jobs[jobId]) {
    return NextResponse.json({ error: 'Invalid or missing jobId' }, { status: 400 });
  }
  const job = jobs[jobId];
  return NextResponse.json({
    status: job.status,
    progress: job.progress,
    total: job.total,
    sitemap: job.sitemap || null,
    error: job.error || null,
    pages: job.pages || [],
  });
}

// (Polling endpoint will be added in a separate handler) 