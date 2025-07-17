import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const { name, email, phone, message } = await req.json();
    if (!name || !email || !phone || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // TODO: Replace this with your Resend (or other email provider) logic
    // Example with Resend (pseudo-code):
    // await resend.emails.send({
    //   from: 'Your Name <your@email.com>',
    //   to: 'contact@zaidapp.com',
    //   subject: `New Contact Form Submission from ${name}`,
    //   reply_to: email,
    //   text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
    // });

    // For now, just simulate success
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
} 