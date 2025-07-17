"use client";
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Copy } from 'lucide-react';

function minifyCSS(css: string): string {
  return css
    .replace(/\/\*[^*]*\*+([^/*][^*]*\*+)*\//g, '') // Remove comments
    .replace(/\s+/g, ' ') // Collapse whitespace
    .replace(/\s*([:;{},>])\s*/g, '$1') // Remove space around selectors, etc
    .replace(/;}/g, '}') // Remove unnecessary semicolons
    .trim();
}

export default function CSSMinifierClient() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const handleMinify = () => {
    setOutput(minifyCSS(input));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="w-full mx-auto">
      <h1 className="text-3xl font-extrabold mb-8 text-gradient bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent text-center">CSS Minifier</h1>
      <label className="block mb-2 font-semibold text-lg">Paste your CSS code</label>
      <Textarea
        className="w-full font-mono text-sm bg-background border border-border rounded-lg px-4 py-2 mb-4"
        rows={8}
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="/* Paste your CSS here */"
      />
      <Button className="w-full mb-6" onClick={handleMinify} type="button">Minify CSS</Button>
      <div className="flex items-center justify-between mb-2">
        <label className="block font-semibold text-lg">Minified CSS</label>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="icon" variant="ghost" className="ml-2" onClick={handleCopy} type="button" disabled={!output} aria-label="Copy to clipboard">
                <Copy className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">{copied ? 'Copied!' : 'Copy to Clipboard'}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <Textarea
        className="w-full font-mono text-sm bg-background border border-border rounded-lg px-4 py-2"
        rows={8}
        value={output}
        readOnly
        placeholder="Minified CSS will appear here"
      />
    </div>
  );
} 