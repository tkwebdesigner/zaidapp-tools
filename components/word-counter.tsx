'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ScrollText, Clock, Hash, FileText } from 'lucide-react';

interface WordStats {
  words: number;
  characters: number;
  sentences: number;
  paragraphs: number;
  readingTime: number;
}

export function WordCounter() {
  const [text, setText] = useState('');
  const [stats, setStats] = useState<WordStats>({
    words: 0,
    characters: 0,
    sentences: 0,
    paragraphs: 0,
    readingTime: 0,
  });

  const calculateStats = (input: string) => {
    const words = input.trim().split(/\s+/).filter(word => word.length > 0);
    const characters = input.length;
    const sentences = input.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0);
    const paragraphs = input.split(/\n\s*\n/).filter(para => para.trim().length > 0);
    const readingTime = Math.ceil(words.length / 200); // Assuming 200 words per minute

    setStats({
      words: words.length,
      characters,
      sentences: sentences.length,
      paragraphs: paragraphs.length,
      readingTime,
    });
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);
    calculateStats(newText);
  };

  const StatCard = ({ icon: Icon, label, value }: { icon: any; label: string; value: number }) => (
    <Card className="p-4">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="w-full mx-auto space-y-6">
      <Card className="p-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="text">Enter your text</Label>
            <Textarea
              id="text"
              placeholder="Start typing or paste your text here..."
              value={text}
              onChange={handleTextChange}
              className="min-h-[200px]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              icon={FileText}
              label="Words"
              value={stats.words}
            />
            <StatCard
              icon={Hash}
              label="Characters"
              value={stats.characters}
            />
            <StatCard
              icon={ScrollText}
              label="Sentences"
              value={stats.sentences}
            />
            <StatCard
              icon={Clock}
              label="Reading Time (min)"
              value={stats.readingTime}
            />
          </div>
        </div>
      </Card>
    </div>
  );
}