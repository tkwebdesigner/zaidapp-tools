import { NextResponse } from 'next/server';
import sharp from 'sharp';

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
    const [fromFormatRaw] = conversionType.split('-to-');
    // Normalize 'jpg' to 'jpeg' for sharp
    const fromFormat = fromFormatRaw === 'jpg' ? 'jpeg' : fromFormatRaw;
    const fileType = await sharp(buffer).metadata().then(meta => meta.format);
    
    if (fileType !== fromFormat) {
      return NextResponse.json(
        { error: `Invalid file type. Expected ${fromFormatRaw.toUpperCase()}` },
        { status: 400 }
      );
    }

    let sharpInstance = sharp(buffer);

    // Apply conversion based on target format
    switch (conversionType.split('-to-')[1]) {
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
        'Content-Type': `image/${conversionType.split('-to-')[1]}`,
        'Content-Disposition': `attachment; filename="converted-image.${conversionType.split('-to-')[1]}"`,
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