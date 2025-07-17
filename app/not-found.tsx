import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center gap-8 px-4">
      <img src="/images/placeholder.svg" alt="Not Found" className="w-40 h-40 mx-auto opacity-80" />
      <h1 className="text-6xl font-extrabold text-gradient bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">404</h1>
      <p className="text-xl md:text-2xl text-muted-foreground max-w-xl mx-auto">Sorry, the page you are looking for does not exist or has been moved.</p>
      <Button asChild size="lg" className="mt-4">
        <Link href="/">Go back Home</Link>
      </Button>
    </div>
  );
} 