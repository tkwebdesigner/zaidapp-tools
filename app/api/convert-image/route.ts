import { NextResponse } from 'next/server';
import sharp from 'sharp';
import potrace from 'potrace'; // ✅ Corrected import for potrace

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const conversionType = formData.get('conversionType') as string;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Convert File to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const [fromFormatRaw, toFormatRaw] = conversionType.split('-to-');
    const fromFormat = fromFormatRaw === 'jpg' ? 'jpeg' : fromFormatRaw;

    const metadata = await sharp(buffer).metadata();
    const fileType = metadata.format;

    // Validate input type
    if (conversionType === 'svg-to-png') {
      if (fileType !== 'svg') {
        return NextResponse.json({ error: `Invalid file type. Expected SVG` }, { status: 400 });
      }
    } else if (fromFormatRaw === 'avif') {
      if (fileType !== 'avif') {
        return NextResponse.json({ error: `Invalid file type. Expected AVIF` }, { status: 400 });
      }
    } else {
      if (fileType !== fromFormat) {
        return NextResponse.json(
          { error: `Invalid file type. Expected ${fromFormatRaw.toUpperCase()}` },
          { status: 400 }
        );
      }
    }

    // ✅ PNG to SVG with potrace
    if (conversionType === 'png-to-svg') {
      if (fileType !== 'png') {
        return NextResponse.json({ error: `Invalid file type. Expected PNG` }, { status: 400 });
      }

      // Preprocess the image for tracing
      const preProcessedBuffer = await sharp(buffer)
        .flatten({ background: '#ffffff' }) // Remove transparency
        .resize(512)                         // Optional: resize for performance
        .grayscale()
        .threshold(128)                      // Convert to black & white
        .toBuffer();

      const svg = await new Promise<string>((resolve, reject) => {
        potrace.trace(preProcessedBuffer, { type: 'svg' }, (err, svg) => {
          if (err) {
            console.error('Potrace error:', err);
            reject(err);
          } else {
            resolve(svg);
          }
        });
      });

      return new NextResponse(svg, {
        headers: {
          'Content-Type': 'image/svg+xml',
          'Content-Disposition': 'attachment; filename="converted-image.svg"',
        },
      });
    }

    // ✅ Other conversions (e.g., jpg-to-png, webp-to-jpg)
    let sharpInstance = sharp(buffer);
    switch (toFormatRaw) {
      case 'png':
        sharpInstance = sharpInstance.png();
        break;
      case 'jpg':
        sharpInstance = sharpInstance.jpeg({ quality: 90 });
        break;
      case 'webp':
        sharpInstance = sharpInstance.webp({ quality: 90 });
        break;
      default:
        return NextResponse.json(
          { error: 'Unsupported conversion format' },
          { status: 400 }
        );
    }

    const convertedBuffer = await sharpInstance.toBuffer();

    return new NextResponse(convertedBuffer, {
      headers: {
        'Content-Type': `image/${toFormatRaw}`,
        'Content-Disposition': `attachment; filename="converted-image.${toFormatRaw}"`,
      },
    });
  } catch (error) {
    console.error('Image conversion error:', error);
    return NextResponse.json(
      { error: 'Failed to convert image. Please try again.' },
      { status: 500 }
    );
  }
}
