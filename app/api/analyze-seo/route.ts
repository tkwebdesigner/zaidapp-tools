import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    // Validate URL
    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      );
    }

    try {
      new URL(url);
    } catch {
      return NextResponse.json(
        { error: 'Invalid URL format' },
        { status: 400 }
      );
    }

    // Use a more robust way to fetch the URL
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; SEOAnalyzer/1.0; +http://example.com)',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      },
      redirect: 'follow',
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch URL: ${response.statusText}` },
        { status: response.status }
      );
    }

    const html = await response.text();
    if (!html) {
      return NextResponse.json(
        { error: 'Empty response from URL' },
        { status: 400 }
      );
    }

    const $ = cheerio.load(html);

    // Title analysis
    const title = $('title').text();
    const titleScore = calculateTitleScore(title);

    // Meta description analysis
    const metaDescription = $('meta[name="description"]').attr('content') || '';
    const metaDescriptionScore = calculateMetaDescriptionScore(metaDescription);

    // Meta keywords analysis
    const metaKeywords = $('meta[name="keywords"]').attr('content')?.split(',').map(k => k.trim()) || [];
    const metaKeywordsScore = calculateMetaKeywordsScore(metaKeywords);

    // Open Graph analysis
    const ogTitle = $('meta[property="og:title"]').attr('content') || '';
    const ogDescription = $('meta[property="og:description"]').attr('content') || '';
    const ogImage = $('meta[property="og:image"]').attr('content') || '';
    const ogScore = calculateOpenGraphScore(ogTitle, ogDescription, ogImage);

    // Twitter Card analysis
    const twitterTitle = $('meta[name="twitter:title"]').attr('content') || '';
    const twitterDescription = $('meta[name="twitter:description"]').attr('content') || '';
    const twitterImage = $('meta[name="twitter:image"]').attr('content') || '';
    const twitterScore = calculateTwitterCardScore(twitterTitle, twitterDescription, twitterImage);

    // Canonical URL analysis
    const canonical = $('link[rel="canonical"]').attr('href') || '';
    const canonicalScore = calculateCanonicalScore(canonical, url);

    // Schema markup analysis
    const schemas = $('script[type="application/ld+json"]')
      .map((_, el) => {
        try {
          const schema = JSON.parse($(el).html() || '{}');
          return schema['@type'];
        } catch {
          return null;
        }
      })
      .get()
      .filter(Boolean);
    const schemaScore = calculateSchemaScore(schemas);

    // Calculate overall score
    const overallScore = Math.round(
      (titleScore.score +
        metaDescriptionScore.score +
        metaKeywordsScore.score +
        ogScore.score +
        twitterScore.score +
        canonicalScore.score +
        schemaScore.score) / 7
    );

    return NextResponse.json({
      url,
      title: {
        content: title,
        length: title.length,
        score: titleScore.score,
        suggestions: titleScore.suggestions,
      },
      metaDescription: {
        content: metaDescription,
        length: metaDescription.length,
        score: metaDescriptionScore.score,
        suggestions: metaDescriptionScore.suggestions,
      },
      metaKeywords: {
        content: metaKeywords,
        count: metaKeywords.length,
        score: metaKeywordsScore.score,
        suggestions: metaKeywordsScore.suggestions,
      },
      openGraph: {
        title: ogTitle,
        description: ogDescription,
        image: ogImage,
        score: ogScore.score,
        suggestions: ogScore.suggestions,
      },
      twitterCard: {
        title: twitterTitle,
        description: twitterDescription,
        image: twitterImage,
        score: twitterScore.score,
        suggestions: twitterScore.suggestions,
      },
      canonical: {
        url: canonical,
        score: canonicalScore.score,
        suggestions: canonicalScore.suggestions,
      },
      schema: {
        types: schemas,
        score: schemaScore.score,
        suggestions: schemaScore.suggestions,
      },
      overallScore,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to analyze website' },
      { status: 500 }
    );
  }
}

function calculateTitleScore(title: string) {
  const suggestions: string[] = [];
  let score = 100;

  if (!title) {
    suggestions.push('Missing title tag');
    score -= 50;
  } else {
    if (title.length < 30) {
      suggestions.push('Title is too short (recommended: 30-60 characters)');
      score -= 20;
    } else if (title.length > 60) {
      suggestions.push('Title is too long (recommended: 30-60 characters)');
      score -= 20;
    }
  }

  return { score: Math.max(0, score), suggestions };
}

function calculateMetaDescriptionScore(description: string) {
  const suggestions: string[] = [];
  let score = 100;

  if (!description) {
    suggestions.push('Missing meta description');
    score -= 50;
  } else {
    if (description.length < 120) {
      suggestions.push('Meta description is too short (recommended: 120-160 characters)');
      score -= 20;
    } else if (description.length > 160) {
      suggestions.push('Meta description is too long (recommended: 120-160 characters)');
      score -= 20;
    }
  }

  return { score: Math.max(0, score), suggestions };
}

function calculateMetaKeywordsScore(keywords: string[]) {
  const suggestions: string[] = [];
  let score = 100;

  if (!keywords.length) {
    suggestions.push('Missing meta keywords');
    score -= 30;
  } else {
    if (keywords.length < 3) {
      suggestions.push('Too few keywords (recommended: 3-8 keywords)');
      score -= 20;
    } else if (keywords.length > 8) {
      suggestions.push('Too many keywords (recommended: 3-8 keywords)');
      score -= 20;
    }
  }

  return { score: Math.max(0, score), suggestions };
}

function calculateOpenGraphScore(title: string, description: string, image: string) {
  const suggestions: string[] = [];
  let score = 100;

  if (!title) {
    suggestions.push('Missing og:title');
    score -= 20;
  }
  if (!description) {
    suggestions.push('Missing og:description');
    score -= 20;
  }
  if (!image) {
    suggestions.push('Missing og:image');
    score -= 20;
  }

  return { score: Math.max(0, score), suggestions };
}

function calculateTwitterCardScore(title: string, description: string, image: string) {
  const suggestions: string[] = [];
  let score = 100;

  if (!title) {
    suggestions.push('Missing twitter:title');
    score -= 20;
  }
  if (!description) {
    suggestions.push('Missing twitter:description');
    score -= 20;
  }
  if (!image) {
    suggestions.push('Missing twitter:image');
    score -= 20;
  }

  return { score: Math.max(0, score), suggestions };
}

function calculateCanonicalScore(canonical: string, url: string) {
  const suggestions: string[] = [];
  let score = 100;

  if (!canonical) {
    suggestions.push('Missing canonical URL');
    score -= 50;
  } else if (canonical !== url) {
    suggestions.push('Canonical URL differs from current URL');
    score -= 20;
  }

  return { score: Math.max(0, score), suggestions };
}

function calculateSchemaScore(schemas: string[]) {
  const suggestions: string[] = [];
  let score = 100;

  if (!schemas.length) {
    suggestions.push('No schema markup detected');
    score -= 50;
  } else {
    if (schemas.length < 2) {
      suggestions.push('Consider adding more schema types for better SEO');
      score -= 20;
    }
  }

  return { score: Math.max(0, score), suggestions };
}