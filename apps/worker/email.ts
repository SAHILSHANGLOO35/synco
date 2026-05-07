import nodemailer from "nodemailer"

const transport = nodemailer.createTransport({
  host: process.env.SMTP_ENDPOINT,
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
})

export async function sendEmail(to: string, body: string, subject?: string) {
  try {
    if (!to || !body) throw new Error("Recipient and body are required")

    await transport.sendMail({
      from: `"Synco Alerts" <${process.env.SMTP_USERNAME}>`,
      to,
      subject: subject ?? "Synco Alert Notification",
      text: body,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 8px;">
          <div style="border-bottom: 2px solid #4f46e5; padding-bottom: 16px; margin-bottom: 24px;">
            <h1 style="margin: 0; font-size: 20px; color: #111827;">Synco</h1>
            <p style="margin: 4px 0 0; font-size: 13px; color: #6b7280;">Automated Alert System</p>
          </div>

          <p style="font-size: 15px; color: #374151; line-height: 1.6; white-space: pre-line;">${body}</p>

          <div style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #e5e7eb;">
            <p style="margin: 0; font-size: 12px; color: #9ca3af;">
              This is an automated message from Synco. Please do not reply directly to this email.
            </p>
            <p style="margin: 4px 0 0; font-size: 12px; color: #9ca3af;">
              © ${new Date().getFullYear()} Synco. All rights reserved.
            </p>
          </div>
        </div>
      `,
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    throw new Error(`sendEmail failed: ${message}`)
  }
}
