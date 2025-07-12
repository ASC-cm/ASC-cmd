import nodemailer from "nodemailer";
import { Resend } from "resend";

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Configure Zoho Mail transporter
const zohoTransporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.ZOHO_EMAIL,
    pass: process.env.ZOHO_PASSWORD,
  },
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email } = req.body;

  try {
    // 1. Save to Zoho Mail
    const zohoMailOptions = {
      from: process.env.ZOHO_EMAIL,
      to: "contact@asc-cm.com.ng", // Your own email
      subject: "New User Subscription",
      text: `New subscriber: ${email}\n\nTimestamp: ${new Date().toISOString()}`,
    };

    await zohoTransporter.sendMail(zohoMailOptions);

    // 2. Send confirmation with Resend onboarding@resend.dev
    const { data, error } = await resend.emails.send({
      from: "ASC-cm <contact@asc-cm.com.ng>",
      to: email,
      subject: "Thanks for subscribing!",
      html: `
       <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
         <h1 style="color: #2563eb;">Welcome to ASC-cm!</h1>
          <p>Thank you for subscribing to our newsletter. Here's what you can expect from us:</p>
        <ul>
          <li>Latest updates in web and software development</li>
          <li>Exclusive tips on building fast, modern websites</li>
          <li>Product launches, tutorials, and tech events</li>
        </ul>
        <p>If you didn’t subscribe, you can safely ignore this message.</p>
        <p style="margin-top: 20px; color: #6b7280;">
          Best regards,<br/>
          The ASC-cm Tech Team<br/>
          <a href="https://asc-cm.com.ng" style="color: #2563eb;">asc-cm.com.ng</a>
        </p>
      </div>
      `,
      text: `Welcome to our Tech news!\n\nThank you for subscribing. You'll receive weekly tech related tips, exclusive offers, and package updates.\n\nIf you didn't request this, please ignore this email.\n\nBest regards,\nThe ASC-cn Team`,
    });

    if (error) {
      console.error("Resend error:", error);
      throw new Error("Resend failed: " + error.message);
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Subscription error:", error);
    return res.status(500).json({
      message: error.message || "Failed to process subscription",
    });
  }
}
