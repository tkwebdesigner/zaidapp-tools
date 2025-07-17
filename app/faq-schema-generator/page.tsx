import FAQSchemaGeneratorClient from './FAQSchemaGeneratorClient';

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
        url: '/sharing-images/seo-checker-tool.webp',
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
    images: ['/sharing-images/seo-checker-tool.webp'],
  },
};

export default function FAQSchemaGeneratorPage() {
  return (
    <>
      <FAQSchemaGeneratorClient />
      <div className="mt-4 mx-auto text-base leading-relaxed text-muted-foreground">
        <h2 className="text-2xl font-bold mb-4 text-foreground">About the FAQ Schema Generator Tool</h2>
        <p>
          The FAQ Schema Generator Tool is a powerful and user-friendly utility designed to help website owners, marketers, and SEO professionals create structured FAQ data for their websites. By generating valid JSON-LD FAQ schema, this tool enables you to enhance your site's search engine visibility, improve user experience, and increase the likelihood of your FAQs appearing as rich results in Google and other search engines.
        </p>
        <p className="mt-4">
          <strong>What is FAQ Schema?</strong> FAQ schema is a type of structured data markup that you can add to your web pages to explicitly define frequently asked questions and their answers. This markup helps search engines understand your content better and can result in your FAQs being displayed directly in search results, making your site more attractive and informative to users.
        </p>
        <p className="mt-4">
          <strong>Features:</strong> The FAQ Schema Generator Tool offers a simple interface where you can add, edit, and remove as many question/answer pairs as you need. The tool instantly generates valid JSON-LD code that you can copy and paste into your website. It supports unlimited FAQs, real-time preview, and a one-click copy-to-clipboard feature for maximum convenience.
        </p>
        <div className="mt-4">
          <strong>Use Cases:</strong> This tool is ideal for businesses, bloggers, e-commerce sites, and anyone who wants to provide clear answers to common questions. By using FAQ schema, you can:
          <ul className="list-disc ml-6 mt-2">
            <li>Increase your chances of getting rich snippets in Google search results</li>
            <li>Reduce customer support queries by providing instant answers</li>
            <li>Improve your site's SEO and click-through rates</li>
            <li>Enhance user trust and engagement</li>
          </ul>
        </div>
        <p className="mt-4">
          <strong>Benefits:</strong> Implementing FAQ schema can lead to higher visibility in search results, more traffic, and a better user experience. It also helps search engines understand your content, which can improve your overall site ranking. The tool ensures that your schema is always valid and up-to-date with the latest standards.
        </p>
        <p className="mt-4">
          <strong>Best Practices:</strong> When using the FAQ Schema Generator Tool, make sure your questions and answers are clear, concise, and genuinely helpful. Avoid duplicating content or using the schema for promotional purposes. Only include questions that are relevant to your users and provide accurate answers.
        </p>
        <p className="mt-4">
          <strong>Tips:</strong> Regularly update your FAQs to reflect new information or changes in your business. Test your generated schema using Google's Rich Results Test tool to ensure it is correctly implemented. Consider adding FAQs to multiple pages on your site to address different user needs.
        </p>
        <p className="mt-4">
          <strong>Conclusion:</strong> The FAQ Schema Generator Tool is an essential resource for anyone looking to improve their website's SEO and user experience. By making it easy to create and implement structured FAQ data, this tool helps you stay ahead in the competitive world of search engine optimization. Try it today and see the difference it can make for your site!
        </p>
      </div>
    </>
  );
} 