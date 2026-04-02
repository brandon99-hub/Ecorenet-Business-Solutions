import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const app = express();
const PORT = process.env.API_PORT || 3001;

app.use(express.json());

// ─── Nodemailer Transporter (Gmail) ──────────────────────────────────────────
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS, // Gmail App Password — NOT your account password
  },
});

// ─── POST /api/contact ────────────────────────────────────────────────────────
app.post('/api/contact', async (req, res) => {
  const { firstName, lastName, phone, email, company, service, message } = req.body;

  if (!firstName || !lastName || !email || !message) {
    return res.status(400).json({ success: false, error: 'Missing required fields' });
  }

  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 620px; margin: 0 auto; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0;">
      <!-- Header -->
      <div style="background: #0B1B32; padding: 28px 32px;">
        <h1 style="color: white; margin: 0 0 4px; font-size: 22px; font-weight: 800;">New Website Inquiry</h1>
        <p style="color: rgba(255,255,255,0.5); margin: 0; font-size: 13px; text-transform: uppercase; letter-spacing: 0.08em;">Ecorenet Business Solutions</p>
      </div>

      <!-- Body -->
      <div style="background: #f9f9ff; padding: 32px;">
        <table style="width: 100%; border-collapse: collapse; font-size: 15px;">
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #64748b; width: 160px; vertical-align: top; font-weight: 600;">Full Name</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #0B1B32; font-weight: 600;">${firstName} ${lastName}</td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #64748b; font-weight: 600;">Email</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
              <a href="mailto:${email}" style="color: #f1414d; font-weight: 600;">${email}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #64748b; font-weight: 600;">Phone</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #0B1B32;">${phone || '<em style="color:#94a3b8;">Not provided</em>'}</td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #64748b; font-weight: 600;">Company</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #0B1B32;">${company || '<em style="color:#94a3b8;">Not provided</em>'}</td>
          </tr>
          <tr>
            <td style="padding: 12px 0; color: #64748b; font-weight: 600;">Service</td>
            <td style="padding: 12px 0; color: #0B1B32;">${service || '<em style="color:#94a3b8;">Not specified</em>'}</td>
          </tr>
        </table>

        <!-- Message -->
        <div style="margin-top: 24px;">
          <p style="color: #64748b; margin: 0 0 10px; font-weight: 600; font-size: 14px; text-transform: uppercase; letter-spacing: 0.06em;">Message</p>
          <div style="background: white; padding: 20px; border-radius: 10px; border: 1px solid #e2e8f0; color: #0B1B32; line-height: 1.7; white-space: pre-wrap;">${message}</div>
        </div>

        <!-- Reply hint -->
        <div style="margin-top: 24px; padding: 16px 20px; background: #fff1f2; border-radius: 10px; border-left: 4px solid #f1414d;">
          <p style="margin: 0; color: #64748b; font-size: 13px; line-height: 1.6;">
            Hit <strong>Reply</strong> to respond directly to <strong>${firstName} ${lastName}</strong> at
            <a href="mailto:${email}" style="color: #f1414d;">${email}</a>.
          </p>
        </div>
      </div>

      <!-- Footer -->
      <div style="background: #0B1B32; padding: 16px 32px; text-align: center;">
        <p style="color: rgba(255,255,255,0.4); margin: 0; font-size: 12px;">
          This message was sent through the contact form on <strong style="color: rgba(255,255,255,0.7);">ecorenet.co.ke</strong>
        </p>
      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"Ecorenet Website" <${process.env.SMTP_USER}>`,
      to: 'info@ecorenet.co.ke',
      replyTo: email,
      subject: `[Inquiry] ${service ? service + ' — ' : ''}${firstName} ${lastName}`,
      html: htmlBody,
    });

    console.log(`✉️  Inquiry from ${firstName} ${lastName} <${email}> sent successfully.`);
    res.json({ success: true });
  } catch (error) {
    console.error('❌ Email send error:', error);
    res.status(500).json({ success: false, error: 'Failed to send email' });
  }
});

// ─── Health check ────────────────────────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`✅ API server running on http://localhost:${PORT}`);
});
