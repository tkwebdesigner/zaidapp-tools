import Image from 'next/image';
import FAQSchemaGeneratorClient from './FAQSchemaGeneratorClient';
import Link from 'next/link';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';

export const metadata = {
  title: 'FAQ Schema Generator - Web Tools',
  description: 'Easily generate valid FAQ schema (JSON-LD) for your website. Improve your SEO with structured data for frequently asked questions.',
  openGraph: {
    title: 'FAQ Schema Generator - Web Tools',
    description: 'Easily generate valid FAQ schema (JSON-LD) for your website. Improve your SEO with structured data for frequently asked questions.',
    url: '/faq-schema-generator',
    type: 'website',
    images: [
      {
        url: '/sharing-images/faq-schema-generator.webp',
        width: 1200,
        height: 630,
        alt: 'FAQ Schema Generator - Web Tools',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FAQ Schema Generator - Web Tools',
    description: 'Easily generate valid FAQ schema (JSON-LD) for your website. Improve your SEO with structured data for frequently asked questions.',
    images: ['/sharing-images/faq-schema-generator.webp'],
  },
};

export default function FAQSchemaGeneratorPage() {
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
                <BreadcrumbPage>FAQ Schema Generator</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gradient bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-2">FAQ Schema Generator</h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Easily generate valid FAQ schema (JSON-LD) for your website. Improve your SEO with structured data for frequently asked questions.
          </p>
        </div>
        <div className="max-w-3xl mx-auto">
          <FAQSchemaGeneratorClient />
        </div>
      </main>
      <div className="mt-4 mx-auto text-base leading-relaxed text-muted-foreground">
        <h2 className="text-2xl font-bold mb-4 text-foreground">About the FAQ Schema Generator Tool</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5'>
          <Image className='rounded-lg shadow-sm border' src={'/sharing-images/faq-schema-generator.webp'} alt='FAQ Schema Generator Tool' title='FAQ Schema Generator Tool' width={1200} height={675} />
          <div>
            <p>
              The <strong>FAQ Schema Generator Tool</strong> is a powerful and user-friendly utility designed to help website owners, marketers, and SEO professionals create structured FAQ data for their websites. By generating valid JSON-LD FAQ schema, this tool enables you to enhance your site&apos;s search engine visibility, improve user experience, and increase the likelihood of your FAQs appearing as rich results in Google and other search engines.
            </p>
            <h2 className="text-2xl font-bold mt-5 mb-4 text-foreground">What is FAQ Schema?</h2>
            <p className="mt-4">
              FAQ schema is a structured data markup you can implement in your website pages for the express purpose of clearly specifying frequently asked questions and their responses. It helps search engines get a clearer understanding of your page, and incorporating it can mean your FAQs being presented right in search result listings, making your page more appealing and informative for users.
            </p>
          </div>
        </div>
        <p className="mt-4">
          <strong>Features:</strong> FAQ Schema Generator Tool offers a simple interface in which you can input, edit, and remove as many question/answer sets as you wish. It instantly generates perfectly correct JSON-LD code, ready for you to copy and paste in your page. It includes unlimited FAQs, live preview, in addition to a single click copy-to-clipboard functionality for simplicity.
        </p>
        <div className="mt-4">
          <strong>Use Cases:</strong> This tool is ideal for businesses, bloggers, e-commerce sites, and anyone who wants to provide clear answers to common questions. By using FAQ schema, you can:
          <ul className="list-disc ml-6 mt-2">
            <li>Increase your visibility for rich snippets in Google search results</li>
            <li>Reduce customer support queries by providing instant answers</li>
            <li>Improve your site&apos;s SEO and click-through rates</li>
            <li>Increase user trust and interaction</li>
          </ul>
        </div>
        <p className="mt-4">
          <strong>Pros:</strong> By adding FAQ schema, you can experience greater search results visibility, greater traffic, and a better user experience. It also helps make it easy for search engines to understand your content, giving you a better overall ranking for your site. It keeps your schema up-to-date, valid, and in compliance with current standards with the assistance of the tool.
        </p>
        <p className="mt-4">
          <strong>Best Practices:</strong> When you are utilizing the <strong>FAQ Schema Generator Tool</strong>, keep in mind that your questions and answers must be short, succinct, clear, and really helpful. Do not duplicate contents nor for marketing intent use the schema. Mention only questions applicable for your users and answer them accordingly.
        </p>
        <p className="mt-4">
          <strong>Tips:</strong> Regularly update your FAQs to reflect new information or changes in your business. Test your generated schema using Google&apos;s Rich Results Test tool to ensure it is correctly implemented. Consider adding FAQs to multiple pages on your site to address different user needs.
        </p>
        <p className="mt-4">
          <strong>Conclusion:</strong> The FAQ Schema Generator Tool is an absolute necessity for anyone looking to give their website a much-needed SEO and usability boost. By making it easy for you to create and install properly formatted FAQ data, the tool keeps you one step ahead in the incredibly competitive space of <Link className='text-blue-500 underline' href={'seo-checker'} target='_blank'>Search Engine Optimization Checker Tool</Link>. Try it out now and see how much of a difference it can make for your site!
        </p>
      </div>
    </>
  );
} 