import SpeechToTextClient from './SpeechToTextClient';


export const metadata = {
  title: 'Speech to Text - Convert Voice to Text | Free Online Tool',
  description: 'Convert your speech to text in real-time. Supports English and Hindi languages. Free, fast, and accurate voice recognition tool.',
  keywords: 'speech to text, voice to text, speech recognition, voice recognition, English Hindi speech to text',
  openGraph: {
    title: 'Speech to Text - Convert Voice to Text | Free Online Tool',
    description: 'Convert your speech to text in real-time. Supports English and Hindi languages. Free, fast, and accurate voice recognition tool.',
    type: 'website',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/speech-to-text`,
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/sharing-images/speech-to-text.webp`,
        width: 1200,
        height: 630,
        alt: 'Speech to Text Tool',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Speech to Text - Convert Voice to Text | Free Online Tool',
    description: 'Convert your speech to text in real-time. Supports English and Hindi languages. Free, fast, and accurate voice recognition tool.',
    images: [`${process.env.NEXT_PUBLIC_SITE_URL}/sharing-images/speech-to-text.webp`],
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/speech-to-text`,
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Speech to Text Converter',
  description: 'Convert your speech to text in real-time with support for English and Hindi languages.',
  url: `${process.env.NEXT_PUBLIC_SITE_URL}/speech-to-text`,
  applicationCategory: 'UtilityApplication',
  operatingSystem: 'Any',
  permissions: 'microphone',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  featureList: [
    'Real-time speech recognition',
    'English and Hindi language support',
    'Copy to clipboard functionality',
    'Download as text file',
    'Privacy-focused (no data stored)',
  ],
};

export default function SpeechToTextPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Speech to Text Converter
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Convert your speech to text in real-time with high accuracy. Supports English and Hindi languages 
              with easy copy and download functionality.
            </p>
          </div>
          
          <SpeechToTextClient />

          {/* Features Section */}
          <div className="mt-12 grid md:grid-cols-2 gap-6">
            <div className="bg-card rounded-lg p-6 border">
              <h2 className="text-xl font-semibold mb-4 text-foreground">Key Features</h2>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                  Real-time speech recognition
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                  English and Hindi language support
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                  Copy to clipboard functionality
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                  Download as text file
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                  Privacy-focused (no data stored)
                </li>
              </ul>
            </div>

            <div className="bg-card rounded-lg p-6 border">
              <h2 className="text-xl font-semibold mb-4 text-foreground">Supported Languages</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <span className="font-medium">English</span>
                  <span className="text-sm text-muted-foreground">en-US</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <span className="font-medium">Hindi (हिंदी)</span>
                  <span className="text-sm text-muted-foreground">hi-IN</span>
                </div>
              </div>
            </div>
          </div>

          {/* Instructions Section */}
          <div className="mt-8 bg-card rounded-lg p-6 border">
            <h2 className="text-xl font-semibold mb-4 text-foreground">How to Use</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary font-semibold">1</span>
                </div>
                <h3 className="font-semibold mb-2">Select Language</h3>
                <p className="text-sm text-muted-foreground">Choose between English or Hindi for speech recognition</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary font-semibold">2</span>
                </div>
                <h3 className="font-semibold mb-2">Start Recording</h3>
                <p className="text-sm text-muted-foreground">Click the microphone button and start speaking</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary font-semibold">3</span>
                </div>
                <h3 className="font-semibold mb-2">Copy or Download</h3>
                <p className="text-sm text-muted-foreground">Copy the text or download it as a file</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
