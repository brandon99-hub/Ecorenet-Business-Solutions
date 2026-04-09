import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';


dotenv.config();

const app = express();
const PORT = process.env.API_PORT || 3001;

// ES Module __dirname fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, 'dist')));


// ─── Nodemailer Transporter (Microsoft 365) ──────────────────────────────────
const transporter = nodemailer.createTransport({
  host: 'smtp.office365.com',
  port: 587,
  secure: false, // STARTTLS
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS, // Microsoft App Password
  },
});

// ─── POST /api/contact ────────────────────────────────────────────────────────
app.post('/api/contact', async (req, res) => {
  const { firstName, lastName, name, phone, email, company, service, message } = req.body;

  // Handle both Landing Page (firstName, lastName) and Product Modal (name)
  const isModal = !!name;
  const fullName = isModal ? name : `${firstName || ''} ${lastName || ''}`.trim();

  if (!fullName || !email || !message) {
    return res.status(400).json({ success: false, error: 'Missing required fields' });
  }

  const originText = isModal ? `Consultation Request: ${service}` : 'Landing Page Inquiry';
  const serviceText = service || 'General Inquiry';

  const htmlBody = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
      
      <!-- Brand Header -->
      <div style="background-color: #0B1B32; padding: 32px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.5px;">New Client Inquiry</h1>
        <p style="color: #94a3b8; font-size: 14px; margin: 8px 0 0 0; text-transform: uppercase; letter-spacing: 1px;">${originText}</p>
      </div>

      <!-- Content Container -->
      <div style="padding: 40px 32px;">
        
        <!-- Details Grid -->
        <div style="margin-bottom: 32px;">
          <h2 style="font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #64748b; margin: 0 0 16px 0; border-bottom: 1px solid #f1f5f9; padding-bottom: 8px;">Contact Details</h2>
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #64748b; width: 120px; font-size: 15px;">Name</td>
              <td style="padding: 8px 0; color: #0B1B32; font-weight: 600; font-size: 15px;">${fullName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; width: 120px; font-size: 15px;">Email</td>
              <td style="padding: 8px 0; font-size: 15px;">
                <a href="mailto:${email}" style="color: #f1414d; text-decoration: none; font-weight: 600;">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; width: 120px; font-size: 15px;">Phone</td>
              <td style="padding: 8px 0; color: #0B1B32; font-size: 15px;">${phone || '<span style="color:#cbd5e1; font-style: italic;">Not provided</span>'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; width: 120px; font-size: 15px;">Company</td>
              <td style="padding: 8px 0; color: #0B1B32; font-size: 15px;">${company || '<span style="color:#cbd5e1; font-style: italic;">Not provided</span>'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; width: 120px; font-size: 15px;">Interest</td>
              <td style="padding: 8px 0; color: #0B1B32; font-weight: 600; font-size: 15px;">${serviceText}</td>
            </tr>
          </table>
        </div>

        <!-- Message Box -->
        <div>
          <h2 style="font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #64748b; margin: 0 0 16px 0; border-bottom: 1px solid #f1f5f9; padding-bottom: 8px;">Message</h2>
          <div style="background-color: #f8fafc; border-left: 4px solid #f1414d; padding: 20px; border-radius: 0 8px 8px 0; color: #334155; line-height: 1.6; font-size: 15px; white-space: pre-wrap;">${message}</div>
        </div>

        <!-- Action Button -->
        <div style="margin-top: 40px; text-align: center;">
          <a href="mailto:${email}" style="display: inline-block; background-color: #f1414d; color: #ffffff; font-weight: 600; font-size: 16px; text-decoration: none; padding: 14px 32px; border-radius: 6px;">Reply to ${fullName}</a>
        </div>

      </div>

      <!-- Footer -->
      <div style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 20px; text-align: center;">
        <p style="margin: 0; color: #94a3b8; font-size: 12px;">This automated alert was generated from your website at <a href="https://ecorenet.co.ke" style="color: #64748b; text-decoration: none;">ecorenet.co.ke</a>.</p>
      </div>
      
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"Ecorenet Website" <${process.env.SMTP_USER}>`,
      to: 'info@ecorenet.co.ke',
      replyTo: email,
      subject: `[Inquiry] ${serviceText} — ${fullName}`,
      html: htmlBody,
    });

    console.log(`✉️  Inquiry from ${fullName} <${email}> [Source: ${originText}] sent successfully.`);
    res.json({ success: true });
  } catch (error) {
    console.error(`❌ Email dispatch failed for ${fullName} <${email}>:`, error);
    res.status(500).json({ success: false, error: 'Failed to send email' });
  }
});

// ─── Health check ────────────────────────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Handle SPA routing - serve index.html for any unknown routes
app.get('*', (req, res) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'API route not found' });
  }
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});


app.listen(PORT, async () => {
  console.log(`✅ API server running on http://localhost:${PORT}`);
  
  // Verify Transporter connection on startup
  console.log('📡 Verifying SMTP connection...');
  try {
    await transporter.verify();
    console.log('✨ SMTP Connection: SUCCESS — Credentials are valid.');
  } catch (error) {
    console.error('⚠️  SMTP Connection: FAILED — Please check your .env SMTP_USER or SMTP_PASS.');
    console.error('   Error detail:', error);
  }
});
