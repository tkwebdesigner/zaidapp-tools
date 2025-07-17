"use client";
import React, { useState, useRef } from "react";
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';

const SITEMAP_TYPES = [
  { label: "HTML Sitemap", value: "html" },
  { label: "XML Sitemap", value: "xml" },
  { label: "XML Sitemap with Images", value: "xml_images" },
];

export default function SitemapGeneratorClient() {
  const [url, setUrl] = useState("");
  const [type, setType] = useState("xml");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);
  const [total, setTotal] = useState(1);
  const [status, setStatus] = useState("");
  const [pages, setPages] = useState<Array<{ url: string; title: string; images: string[] }>>([]);
  const pollRef = useRef<NodeJS.Timeout | null>(null);

  const pollJob = async (jobId: string) => {
    try {
      const res = await fetch(`/api/generate-sitemap?jobId=${jobId}`);
      if (!res.ok) throw new Error("Failed to poll job status");
      const data = await res.json();
      setProgress(data.progress);
      setTotal(data.total);
      setStatus(data.status);
      setPages(data.pages || []);
      if (data.status === "done") {
        setResult(data.sitemap);
        setLoading(false);
        if (pollRef.current) clearTimeout(pollRef.current);
      } else if (data.status === "error") {
        setError(data.error || "Unknown error");
        setLoading(false);
        if (pollRef.current) clearTimeout(pollRef.current);
      } else {
        pollRef.current = setTimeout(() => pollJob(jobId), 1200);
      }
    } catch (err: any) {
      setError(err.message || "Unknown error");
      setLoading(false);
      if (pollRef.current) clearTimeout(pollRef.current);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult("");
    setProgress(0);
    setTotal(1);
    setStatus("");
    setPages([]); // Clear previous pages
    try {
      const res = await fetch("/api/generate-sitemap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, type }),
      });
      if (!res.ok) throw new Error("Failed to start sitemap generation");
      const data = await res.json();
      if (!data.jobId) throw new Error("No jobId returned");
      pollJob(data.jobId);
    } catch (err: any) {
      setError(err.message || "Unknown error");
      setLoading(false);
    }
  };

  const percent = total > 0 ? Math.round((progress / total) * 100) : 0;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Sitemap Generator",
            "description": "Free online sitemap generator tool. Create HTML, XML, and image sitemaps for your website with ease.",
            "image": "/sharing-images/sitemap-generator-tool.webp",
            "url": `${siteUrl}/sitemap-generator`
          })
        }}
      />
      <div className="w-full mx-auto">
        <div className="bg-card/90 rounded-2xl border border-border p-4 sm:p-6 md:p-8 flex flex-col gap-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-2 font-semibold text-lg">Website URL</label>
              <input
                type="url"
                className="w-full border border-border bg-background rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary text-base"
                placeholder="https://example.com"
                value={url}
                onChange={e => setUrl(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold text-lg">Sitemap Type</label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select sitemap type" />
                </SelectTrigger>
                <SelectContent>
                  {SITEMAP_TYPES.map(opt => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="w-full h-12 text-lg font-semibold" disabled={loading}>
              {loading ? (status === "done" ? "Done" : "Generating...") : "Generate Sitemap"}
            </Button>
          </form>
          {loading && (
            <div className="mt-2">
              <div className="w-full bg-muted rounded h-4 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 h-4 transition-all"
                  style={{ width: `${percent}%` }}
                />
              </div>
              <div className="text-xs mt-1 text-muted-foreground">{`Progress: ${progress} / ${total} (${percent}%)`}</div>
              {pages.length > 0 && (
                <div className="mt-4 max-h-64 overflow-y-auto border rounded p-2 bg-muted/50">
                  <div className="font-semibold mb-2">Pages being processed:</div>
                  <ul className="space-y-2">
                    {pages.map((page, idx) => (
                      <li key={page.url + idx} className="border-b pb-2 last:border-b-0">
                        <div className="font-medium text-sm truncate">{page.title || page.url}</div>
                        <div className="text-xs text-muted-foreground truncate">{page.url}</div>
                        {page.images && page.images.length > 0 && (
                          <div className="mt-1 text-xs text-muted-foreground">
                            Images:
                            <ul className="list-disc ml-5">
                              {page.images.map((img, i) => (
                                <li key={img + i} className="truncate">{img}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
          {error && <div className="text-red-600 mt-4 text-center font-semibold">{error}</div>}
          {result && (
            <div className="mt-6">
              <label className="block mb-2 font-semibold text-lg">Generated Sitemap</label>
              <textarea
                className="w-full border border-border rounded-lg px-4 py-2 text-xs bg-background"
                rows={16}
                value={result}
                readOnly
              />
              <Button
                className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white text-lg font-semibold"
                type="button"
                onClick={() => {
                  const blob = new Blob([result], { type: type === 'html' ? 'text/html' : 'application/xml' });
                  const urlObj = window.URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  let filename = 'sitemap.xml';
                  if (type === 'html') filename = 'sitemap.html';
                  else if (type === 'xml_images') filename = 'sitemap-images.xml';
                  a.href = urlObj;
                  a.download = filename;
                  document.body.appendChild(a);
                  a.click();
                  setTimeout(() => {
                    window.URL.revokeObjectURL(urlObj);
                    document.body.removeChild(a);
                  }, 100);
                }}
              >
                Download Sitemap
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
} 