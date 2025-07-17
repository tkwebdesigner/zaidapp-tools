import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export const metadata = {
  title: 'FAQ - Web Tools',
  description: 'Frequently asked questions about Web Tools, including usage, features, and support.',
  openGraph: {
    title: 'FAQ - Web Tools',
    description: 'Frequently asked questions about Web Tools, including usage, features, and support.',
    url: '/faq',
    type: 'website',
    images: [
      {
        url: '/sharing-images/seo-checker-tool.webp',
        width: 1200,
        height: 630,
        alt: 'FAQ - Web Tools',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FAQ - Web Tools',
    description: 'Frequently asked questions about Web Tools, including usage, features, and support.',
    images: ['/sharing-images/seo-checker-tool.webp'],
  },
};

const FAQS = [
  {
    q: 'What is Web Tools?',
    a: 'Web Tools is a collection of free online utilities including word counter, age calculator, SEO checker, image converter, sitemap generator, and more.'
  },
  {
    q: 'Is Web Tools free to use?',
    a: 'Yes, all tools on Web Tools are completely free to use with no registration required.'
  },
  {
    q: 'How accurate is the Word Counter?',
    a: 'Our word counter is highly accurate and counts words, characters, sentences, and reading time in real time.'
  },
  {
    q: 'Can I generate a sitemap for any website?',
    a: 'Yes, the Sitemap Generator works for any public website. Just enter the URL and choose your sitemap type.'
  },
  {
    q: 'What image formats are supported in the Image Converter?',
    a: 'The Image Converter supports popular formats like JPG, PNG, WebP, and SVG.'
  },
  {
    q: 'Is my data safe when using these tools?',
    a: 'Yes, your data is processed securely and is never stored or shared.'
  },
  {
    q: 'Can I use Web Tools on mobile devices?',
    a: 'Absolutely! Web Tools is fully responsive and works great on all devices.'
  },
  {
    q: 'How do I contact support?',
    a: 'You can reach out via the Contact Us page for any questions or feedback.'
  },
  {
    q: 'Do you offer an API for these tools?',
    a: 'Currently, we do not offer a public API, but it is planned for the future.'
  },
  {
    q: 'Who developed Web Tools?',
    a: 'Web Tools is designed and developed by ZaidApp.'
  }
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  'mainEntity': FAQS.map(faq => ({
    '@type': 'Question',
    'name': faq.q,
    'acceptedAnswer': {
      '@type': 'Answer',
      'text': faq.a
    }
  }))
};

export default function FAQPage() {
  return (
    <div className="w-full py-12 px-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <h1 className="text-3xl font-extrabold mb-8 text-gradient bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent text-center">Frequently Asked Questions</h1>
      <Accordion type="single" collapsible className="w-full">
        {FAQS.map((faq, i) => (
          <AccordionItem value={faq.q} key={i}>
            <AccordionTrigger className="text-lg font-semibold">{faq.q}</AccordionTrigger>
            <AccordionContent className="text-base text-muted-foreground">{faq.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
} 