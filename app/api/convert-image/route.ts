import { NextResponse } from 'next/server';
import sharp from 'sharp';
import { Potrace } from 'potrace';
import { Readable } from 'stream';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const conversionType = formData.get('conversionType') as string;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Convert File to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Validate file type
    const [fromFormatRaw, toFormatRaw] = conversionType.split('-to-');
    // Normalize 'jpg' to 'jpeg' for sharp
    const fromFormat = fromFormatRaw === 'jpg' ? 'jpeg' : fromFormatRaw;
    const fileType = await sharp(buffer).metadata().then(meta => meta.format);
    
    // Allow 'svg' as input for svg-to-png
    if (conversionType === 'svg-to-png') {
      if (fileType !== 'svg') {
        return NextResponse.json(
          { error: `Invalid file type. Expected SVG` },
          { status: 400 }
        );
      }
    } else if (fromFormatRaw === 'avif') {
      if (fileType !== 'avif') {
        return NextResponse.json(
          { error: `Invalid file type. Expected AVIF` },
          { status: 400 }
        );
      }
    } else {
      if (fileType !== fromFormat) {
        return NextResponse.json(
          { error: `Invalid file type. Expected ${fromFormatRaw.toUpperCase()}` },
          { status: 400 }
        );
      }
    }

    // PNG to SVG using potrace
    if (conversionType === 'png-to-svg') {
      if (fileType !== 'png') {
        return NextResponse.json(
          { error: `Invalid file type. Expected PNG` },
          { status: 400 }
        );
      }
      // Use potrace to convert PNG buffer to SVG
      const svg = await new Promise((resolve, reject) => {
        Potrace.trace(buffer, { type: 'svg' }, (err, svg) => {
          if (err) reject(err);
          else resolve(svg);
        });
      });
      return new NextResponse(svg, {
        headers: {
          'Content-Type': 'image/svg+xml',
          'Content-Disposition': 'attachment; filename="converted-image.svg"',
        },
      });
    }

    let sharpInstance = sharp(buffer);

    // Apply conversion based on target format
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
      // No need to add avif output, as we only want avif as input for now
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