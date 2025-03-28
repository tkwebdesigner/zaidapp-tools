'use client';

import React, { useState, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Copy, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface TextStats {
  words: number;
  characters: number;
  charactersNoSpaces: number;
  sentences: number;
  paragraphs: number;
}

export function WordCounter() {
  const [text, setText] = useState('');

  const calculateStats = useCallback((text: string): TextStats => {
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, '').length;
    const sentences = text.trim() ? text.split(/[.!?]+/).filter(Boolean).length : 0;
    const paragraphs = text.trim() ? text.split(/\n\s*\n/).filter(Boolean).length : 0;

    return {
      words,
      characters,
      charactersNoSpaces,
      sentences,
      paragraphs,
    };
  }, []);

  const stats = calculateStats(text);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Text copied to clipboard');
    } catch (err) {
      toast.error('Failed to copy text');
    }
  };

  const handleClear = () => {
    setText('');
    toast.success('Text cleared');
  };

  const StatCard = ({ title, value }: { title: string; value: number }) => (
    <Card className="p-4 text-center">
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-sm text-muted-foreground">{title}</div>
    </Card>
  );

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handleCopy}
              disabled={!text}
            >
              <Copy className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleClear}
              disabled={!text}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <Textarea
          placeholder="Type or paste your text here..."
          className="min-h-[200px] text-base"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <StatCard title="Words" value={stats.words} />
        <StatCard title="Characters" value={stats.characters} />
        <StatCard title="Characters (no spaces)" value={stats.charactersNoSpaces} />
        <StatCard title="Sentences" value={stats.sentences} />
        <StatCard title="Paragraphs" value={stats.paragraphs} />
      </div>
    </div>
  );
}