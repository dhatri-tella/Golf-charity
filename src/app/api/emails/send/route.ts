import { Resend } from "resend";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  // ✅ Initialize INSIDE the handler — only runs at request time
  const resend = new Resend(process.env.RESEND_API_KEY);

  const { to, subject, html } = await request.json();

  const { data, error } = await resend.emails.send({
    from: "you@yourdomain.com",
    to,
    subject,
    html,
  });

  if (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json({ data });
}
