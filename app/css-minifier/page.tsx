import CSSMinifierClient from './CSSMinifierClient';

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
        url: '/sharing-images/seo-checker-tool.webp',
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
    images: ['/sharing-images/seo-checker-tool.webp'],
  },
};

export default function CSSMinifierPage() {
  return (
    <>
      <CSSMinifierClient />
      <div className="mt-4 mx-auto text-base leading-relaxed text-muted-foreground">
        <h2 className="text-2xl font-bold mb-4 text-foreground">About the CSS Minifier Tool</h2>
        <p>
          The CSS Minifier Tool is a fast, reliable, and user-friendly utility designed to help web developers, designers, and site owners optimize their CSS code. By removing unnecessary whitespace, comments, and formatting, this tool reduces the size of your CSS files, resulting in faster page loads and improved website performance.
        </p>
        <p className="mt-4">
          <strong>What is CSS Minification?</strong> CSS minification is the process of compressing CSS code by eliminating all unnecessary characters, such as spaces, line breaks, and comments, without affecting how the code functions. The result is a smaller file size, which helps your website load faster and use less bandwidth.
        </p>
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