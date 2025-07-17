'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Loader2, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface SEOAnalysis {
  url: string;
  title: {
    content: string;
    length: number;
    score: number;
    suggestions: string[];
  };
  metaDescription: {
    content: string;
    length: number;
    score: number;
    suggestions: string[];
  };
  metaKeywords: {
    content: string[];
    count: number;
    score: number;
    suggestions: string[];
  };
  openGraph: {
    title: string;
    description: string;
    image: string;
    score: number;
    suggestions: string[];
  };
  twitterCard: {
    title: string;
    description: string;
    image: string;
    score: number;
    suggestions: string[];
  };
  canonical: {
    url: string;
    score: number;
    suggestions: string[];
  };
  schema: {
    types: string[];
    score: number;
    suggestions: string[];
  };
  overallScore: number;
}

export function SEOChecker() {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState<SEOAnalysis | null>(null);

  const analyzeSEO = async () => {
    if (!url) {
      toast.error('Please enter a URL');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/analyze-seo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to analyze website');
      }

      setAnalysis(data);
      toast.success('Analysis completed successfully');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to analyze website. Please try again.';
      toast.error(errorMessage);
      setAnalysis(null);
    } finally {
      setIsLoading(false);
    }
  };

  const ScoreIndicator = ({ score }: { score: number }) => {
    const data = [{ value: score }, { value: 100 - score }];
    const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--muted))'];

    return (
      <div className="w-32 h-32 relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={25}
              outerRadius={40}
              paddingAngle={2}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-2xl font-bold">{score}%</div>
        </div>
      </div>
    );
  };

  const ResultSection = ({ title, score, content, suggestions }: { 
    title: string;
    score: number;
    content: string | string[];
    suggestions: string[];
  }) => (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{title}</h3>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">{score}/100</span>
          {score >= 90 ? (
            <CheckCircle className="w-5 h-5 text-green-500" />
          ) : score >= 70 ? (
            <AlertCircle className="w-5 h-5 text-yellow-500" />
          ) : (
            <XCircle className="w-5 h-5 text-red-500" />
          )}
        </div>
      </div>
      <div className="bg-muted p-3 rounded-md">
        <p className="text-sm break-words">
          {Array.isArray(content) ? content.join(', ') : content}
        </p>
      </div>
      {suggestions.length > 0 && (
        <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
          {suggestions.map((suggestion, index) => (
            <li key={index}>{suggestion}</li>
          ))}
        </ul>
      )}
    </div>
  );

  return (
    <div className="w-full mx-auto space-y-6">
      <Card className="p-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="url">Website URL</Label>
            <div className="flex gap-2">
              <Input
                id="url"
                placeholder="https://example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
              <Button 
                onClick={analyzeSEO} 
                disabled={isLoading}
                className="min-w-[100px]"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  'Analyze'
                )}
              </Button>
            </div>
          </div>

          {analysis && (
            <div className="space-y-6 mt-6">
              <div className="flex items-center justify-center">
                <ScoreIndicator score={analysis.overallScore} />
              </div>

              <div className="grid gap-6">
                <ResultSection
                  title="Title Tag"
                  score={analysis.title.score}
                  content={analysis.title.content}
                  suggestions={analysis.title.suggestions}
                />

                <ResultSection
                  title="Meta Description"
                  score={analysis.metaDescription.score}
                  content={analysis.metaDescription.content}
                  suggestions={analysis.metaDescription.suggestions}
                />

                <ResultSection
                  title="Meta Keywords"
                  score={analysis.metaKeywords.score}
                  content={analysis.metaKeywords.content}
                  suggestions={analysis.metaKeywords.suggestions}
                />

                <ResultSection
                  title="Open Graph"
                  score={analysis.openGraph.score}
                  content={`Title: ${analysis.openGraph.title}\nDescription: ${analysis.openGraph.description}`}
                  suggestions={analysis.openGraph.suggestions}
                />

                <ResultSection
                  title="Twitter Card"
                  score={analysis.twitterCard.score}
                  content={`Title: ${analysis.twitterCard.title}\nDescription: ${analysis.twitterCard.description}`}
                  suggestions={analysis.twitterCard.suggestions}
                />

                <ResultSection
                  title="Canonical URL"
                  score={analysis.canonical.score}
                  content={analysis.canonical.url}
                  suggestions={analysis.canonical.suggestions}
                />

                <ResultSection
                  title="Schema Markup"
                  score={analysis.schema.score}
                  content={analysis.schema.types}
                  suggestions={analysis.schema.suggestions}
                />
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}