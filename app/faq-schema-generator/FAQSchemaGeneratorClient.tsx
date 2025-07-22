"use client";
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { number } from 'framer-motion';

export default function FAQSchemaGeneratorClient() {
  const [faqs, setFaqs] = useState([
    { q: '', a: '' }
  ]);
  const [copied, setCopied] = useState(false);

  const handleChange = (idx: number, field: 'q' | 'a', value: string) => {
    setFaqs(faqs => faqs.map((faq, i) => i === idx ? { ...faq, [field]: value } : faq));
  };

  const addFaq = () => setFaqs(faqs => [...faqs, { q: '', a: '' }]);
  const removeFaq = (idx: number) => setFaqs(faqs => faqs.length > 1 ? faqs.filter((_, i) => i !== idx) : faqs);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.filter(f => f.q && f.a).map(faq => ({
      '@type': 'Question',
      'name': faq.q,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.a
      }
    }))
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(schema, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="w-full mx-auto">
      <form className="flex flex-col gap-8">
        {faqs.map((faq, idx) => (
          <div key={idx} className="flex flex-col gap-2 bg-card/80 border border-border rounded-xl p-4 shadow-sm">
            <Input
              placeholder="Question"
              value={faq.q}
              onChange={e => handleChange(idx, 'q', e.target.value)}
              className="text-base font-medium"
            />
            <Textarea
              placeholder="Answer"
              value={faq.a}
              onChange={e => handleChange(idx, 'a', e.target.value)}
              className="text-base"
              rows={2}
            />
            <div className="flex gap-2 justify-end">
              <Button type="button" variant="destructive" size="sm" onClick={() => removeFaq(idx)} disabled={faqs.length === 1}>Remove</Button>
              {idx === faqs.length - 1 && (
                <Button type="button" variant="secondary" size="sm" onClick={addFaq}>Add</Button>
              )}
            </div>
          </div>
        ))}
      </form>
      <div className="mt-10">
        <label className="block mb-2 font-semibold text-lg">Generated FAQ Schema (JSON-LD)</label>
        <Textarea
          className="w-full font-mono text-sm bg-background border border-border rounded-lg px-4 py-2"
          rows={Math.max(8, faqs.length * 3)}
          value={JSON.stringify(schema, null, 2)}
          readOnly
        />
        <Button className="mt-4 w-full" onClick={handleCopy} type="button">
          {copied ? 'Copied!' : 'Copy to Clipboard'}
        </Button>
      </div>
    </div>
  );
} 