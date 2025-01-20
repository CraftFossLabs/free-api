import { NextRequest, NextResponse } from "next/server";
import nodemailer, { Transporter, SendMailOptions } from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    
    const { name, emails, subject, message, EMAIL_ID, EMAIL_PASS } = await req.json();

    if ( !name || !emails || !Array.isArray(emails) ||  emails.length === 0 || !subject || !message) {
      return NextResponse.json(
        {
          error:
            "All fields (name, emails, subject, message) are required, and emails should be an array with at least one email.",
        },
        { status: 400 }
      );
    }

    if (!EMAIL_ID || !EMAIL_PASS) {
      return NextResponse.json(
        { error: "Email credentials are missing in environment variables" },
        { status: 500 }
      );
    }

    const transporter: Transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: EMAIL_ID,
        pass: EMAIL_PASS,
      },
    });

    for (const email of emails) {
      const mailOptions: SendMailOptions = {
        from: EMAIL_ID,
        to: email,
        subject: subject,
        html: message,
      };

      try {
        await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${email}`);
      } catch (err) {
        console.error(`Failed to send email to ${email}:`, err);
      }
    }

    return NextResponse.json(
      { success: `Emails sent successfully to ${emails.length} recipients!` },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
