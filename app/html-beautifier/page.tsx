import HTMLBeautifierClient from './HTMLBeautifierClient';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';

export const metadata = {
  title: 'HTML Beautifier - Web Tools',
  description: 'Beautify and format your HTML code instantly online. Improve readability and maintain clean markup.',
  openGraph: {
    title: 'HTML Beautifier - Web Tools',
    description: 'Beautify and format your HTML code instantly online. Improve readability and maintain clean markup.',
    url: '/html-beautifier',
    type: 'website',
    images: [
      {
        url: '/sharing-images/seo-checker-tool.webp',
        width: 1200,
        height: 630,
        alt: 'HTML Beautifier - Web Tools',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HTML Beautifier - Web Tools',
    description: 'Beautify and format your HTML code instantly online. Improve readability and maintain clean markup.',
    images: ['/sharing-images/seo-checker-tool.webp'],
  },
};

export default function HTMLBeautifierPage() {
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
                <BreadcrumbLink href="#">Tools</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>HTML Beautifier</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gradient bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-2">HTML Beautifier</h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Beautify and format your HTML code instantly online. Improve readability and maintain clean markup.
          </p>
        </div>
        <div className="max-w-3xl mx-auto">
          <HTMLBeautifierClient />
        </div>
      </main>
      <div className="mt-8 mx-auto text-base leading-relaxed text-muted-foreground max-w-3xl">
        <h2 className="text-2xl font-bold mb-4 text-foreground">About the HTML Beautifier Tool</h2>
        <p>
          The HTML Beautifier Tool is a versatile and essential utility for web developers, designers, and anyone who works with HTML code. It helps you instantly format and organize your HTML, making it easier to read, debug, and maintain. Whether you’re working on a small project or a large website, clean and well-structured HTML is crucial for both development and long-term success.
        </p>
        <p className="mt-4">
          <strong>What is HTML Beautification?</strong> HTML beautification is the process of formatting HTML code by adding proper indentation, line breaks, and spacing. This makes the code more readable and easier to understand, especially when collaborating with others or revisiting your work after some time.
        </p>
        <p className="mt-4">
          <strong>Features:</strong> The HTML Beautifier Tool offers a simple interface where you can paste your HTML code, click a button, and instantly receive a beautifully formatted version. It supports all valid HTML syntax, handles large files, and provides a one-click copy-to-clipboard feature for easy integration into your projects.
        </p>
        <p className="mt-4">
          <strong>Use Cases:</strong> This tool is perfect for developers cleaning up messy code, designers preparing templates, and anyone who wants to improve the readability of their HTML. Use it before sharing code, when debugging, or whenever you want to ensure your markup is clean and consistent.
        </p>
        <p className="mt-4">
          <strong>Benefits:</strong> Beautifying your HTML can lead to faster development, fewer bugs, and easier collaboration. Clean code is easier to maintain, update, and scale as your project grows. It also helps with onboarding new team members and ensuring best practices are followed.
        </p>
        <p className="mt-4">
          <strong>Best Practices:</strong> Always keep your HTML well-formatted during development. Use the beautifier regularly as you work, and encourage your team to do the same. Avoid inline styles and scripts when possible, and separate structure from presentation for better maintainability.
        </p>
        <p className="mt-4">
          <strong>Tips:</strong> Combine the HTML Beautifier with other tools like CSS Minifier and SEO Checker for a complete web optimization workflow. Use the tool to review third-party code, templates, or legacy projects before integrating them into your site.
        </p>
        <p className="mt-4">
          <strong>Conclusion:</strong> The HTML Beautifier Tool is an invaluable resource for anyone working with web code. By making it easy to format and organize your HTML, this tool helps you maintain high-quality, professional websites. Try it now and experience the benefits of clean, beautiful code!
        </p>
      </div>
    </>
  );
} 