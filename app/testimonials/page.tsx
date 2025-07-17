import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

export const metadata = {
  title: 'Testimonials - Web Tools',
  description: 'Read what our users say about Web Tools and their experience with our free online utilities.',
  openGraph: {
    title: 'Testimonials - Web Tools',
    description: 'Read what our users say about Web Tools and their experience with our free online utilities.',
    url: '/testimonials',
    type: 'website',
    images: [
      {
        url: '/sharing-images/testimonials.webp',
        width: 1200,
        height: 630,
        alt: 'Testimonials - Web Tools',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Testimonials - Web Tools',
    description: 'Read what our users say about Web Tools and their experience with our free online utilities.',
    images: ['/sharing-images/testimonials.webp'],
  },
};

const TESTIMONIALS = [
  {
    name: 'Ayesha K.',
    text: 'Web Tools has made my workflow so much easier. The word counter and SEO checker are my favorites!'
  },
  {
    name: 'John D.',
    text: 'I love the clean design and how fast the tools work. Highly recommended for anyone who needs quick online utilities.'
  },
  {
    name: 'Priya S.',
    text: 'The sitemap generator helped me improve my website SEO. Thank you for this amazing free resource!'
  },
  {
    name: 'Michael B.',
    text: 'I use the image converter almost daily. It’s simple, effective, and always reliable.'
  },
  {
    name: 'Sara L.',
    text: 'Great set of tools! Everything works perfectly on my phone and laptop.'
  }
];

export default function TestimonialsPage() {
  return (
    <div className="w-full py-12 px-6">
      <h1 className="text-3xl font-extrabold mb-8 text-gradient bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent text-center">What Our Users Say</h1>
      <Carousel className="w-full">
        <CarouselContent>
          {TESTIMONIALS.map((t, i) => (
            <CarouselItem key={i} className="flex flex-col items-center justify-center p-8 bg-card/80 rounded-2xl shadow-xl border border-border min-h-[220px]">
              <div className="text-lg font-medium text-muted-foreground mb-4">“{t.text}”</div>
              <div className="font-bold text-indigo-500">- {t.name}</div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex justify-center gap-4 mt-6">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </Carousel>
    </div>
  );
} 