import Image from 'next/image';
import CSSMinifierClient from './CSSMinifierClient';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';

export const metadata = {
  title: 'CSS Minifier - Web Tools',
  description: 'Minify your CSS code instantly online. Remove whitespace, comments, and reduce file size for faster websites.',
  openGraph: {
    title: 'CSS Minifier - Web Tools',
    description: 'Minify your CSS code instantly online. Remove whitespace, comments, and reduce file size for faster websites.',
    url: '/css-minifier',
    type: 'website',
    images: [
      {
        url: '/sharing-images/css-minifier.webp',
        width: 1200,
        height: 630,
        alt: 'CSS Minifier - Web Tools',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CSS Minifier - Web Tools',
    description: 'Minify your CSS code instantly online. Remove whitespace, comments, and reduce file size for faster websites.',
    images: ['/sharing-images/css-minifier.webp'],
  },
};

export default function CSSMinifierPage() {
  return (
    <>
      <main>
        <div className="max-w-2xl mx-auto flex flex-col items-center justify-center text-center mt-8 mb-8">
          <Breadcrumb className="justify-center flex mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/convertor">Tools</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>CSS Minifier</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gradient bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-2">CSS Minifier</h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Minify your CSS code instantly online. Remove whitespace, comments, and reduce file size for faster websites.
          </p>
        </div>
        <div className="max-w-3xl mx-auto">
          <CSSMinifierClient />
        </div>
      </main>
      <div className="mt-8 mx-auto text-base leading-relaxed text-muted-foreground">
        <h2 className="text-2xl font-bold mb-4 text-foreground">About the CSS Minifier Tool</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5'>
          <Image className='rounded-lg shadow-sm border border-2' src={'/sharing-images/css-minifier.webp'} alt='CSS Minifier Tool' title='CSS Minifier Tool' width={1200} height={675} />
          <div>
            <p>
              The CSS Minifier Tool is a fast, reliable, and user-friendly utility designed to help web developers, designers, and site owners optimize their CSS code. By removing unnecessary whitespace, comments, and formatting, this tool reduces the size of your CSS files, resulting in faster page loads and improved website performance.
            </p>
            <h2 className="text-2xl font-bold mt-5 mb-4 text-foreground">What is CSS Minification?</h2>
            <p className="mt-4">
              CSS minification is the process of compressing CSS code by eliminating all unnecessary characters, such as spaces, line breaks, and comments, without affecting how the code functions. The result is a smaller file size, which helps your website load faster and use less bandwidth.
            </p>
          </div>
        </div>
        <p className="mt-4">
          <strong>Features:</strong> The CSS Minifier Tool offers a simple interface where you can paste your CSS code, click a button, and instantly receive a minified version. It supports all valid CSS syntax, handles large files, and provides a one-click copy-to-clipboard feature for easy integration into your projects.
        </p>
        <p className="mt-4">
          <strong>Use Cases:</strong> This tool is perfect for web developers looking to optimize their sites, designers preparing assets for production, and anyone who wants to improve website speed. Use it before deploying your site, when updating styles, or whenever you want to reduce file size.
        </p>
        <p className="mt-4">
          <strong>Benefits:</strong> Minifying your CSS can lead to faster page loads, better SEO rankings, and a smoother user experience. Smaller files mean less data for browsers to download, which is especially important for mobile users and those with slower connections.
        </p>
        <p className="mt-4">
          <strong>Best Practices:</strong> Always keep a readable, unminified version of your CSS for development and debugging. Use the minified version only in production. Test your site after minification to ensure everything displays correctly.
        </p>
        <p className="mt-4">
          <strong>Tips:</strong> Combine your CSS files before minifying to reduce HTTP requests. Use the tool regularly as you update your styles. Consider automating minification as part of your build process for larger projects.
        </p>
        <p className="mt-4">
          <strong>Conclusion:</strong> The CSS Minifier Tool is an essential resource for anyone serious about web performance. By making it easy to compress your CSS, this tool helps you deliver faster, more efficient websites. Try it now and see the difference minification can make!
        </p>
      </div>
    </>
  );
} 