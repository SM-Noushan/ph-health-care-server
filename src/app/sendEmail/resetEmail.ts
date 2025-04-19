import transporter from "./sendEmail";
import AppError from "../error/AppError";

const resetEmailBody = (name: string, email: string, resetLink: string) => {
  const html = `<html lang="en">
    <head>
    <meta charset="UTF-8">
    <title>Reset Your PH Health Care Password</title>
    <style>
        body {
        background-color: #f5fafa;
        color: #333333;
        font-family: Arial, sans-serif;
        line-height: 1.6;
        margin: 0;
        padding: 0;
        }
        .container {
        max-width: 600px;
        margin: 40px auto;
        background-color: #ffffff;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .header {
        background-color: #4fae9d;
        padding: 20px;
        text-align: center;
        color: #ffffff;
        }
        .header h1 {
        margin: 0;
        font-size: 24px;
        }
        .content {
        padding: 30px 20px;
        }
        .content h2 {
        color: #4fae9d;
        font-size: 20px;
        margin-top: 0;
        }
        .btn {
        display: inline-block;
        background-color: #4fae9d;
        color: #ffffff !important;
        text-decoration: none;
        padding: 12px 24px;
        border-radius: 4px;
        margin: 20px 0;
        font-weight: bold;
        }
        .footer {
        background-color: #f0f7f7;
        padding: 20px;
        text-align: center;
        font-size: 12px;
        color: #777777;
        }
        .footer a {
        color: #4fae9d;
        text-decoration: none;
        }
    </style>
    </head>
    <body>
    <div class="container">
        <!-- Header -->
        <div class="header">
        <h1>PH Health Care</h1>
        </div>

        <!-- Body -->
        <div class="content">
        <h2>Hello ${name},</h2>
        <p>We received a request to reset the password for your PH Health Care account (${email}). Click the button below to set a new password. For your security, this link will expire in 15 minutes.</p>

        <p style="text-align:center;">
            <a href="${resetLink}" class="btn">Reset My Password</a>
        </p>

        <p>If the button above doesn't work, copy and paste this URL into your browser:</p>
        <p><a href="${resetLink}">${resetLink}</a></p>

        <p>If you didn't request a password reset, simply ignore this email and your password will remain unchanged.</p>

        <hr style="border:none; border-top:1px solid #e0e0e0; margin:30px 0;">

        <p>Thank you for trusting PH Health Care with your health journey. If you have any questions or need help, feel free to reach out to our support team.</p>
        <p>Stay well,<br>The PH Health Care Team</p>
        </div>

        <!-- Footer -->
        <div class="footer">
        <p>PH Health Care</p>
        <p>&copy; ${new Date().getFullYear()} PH Health Care. All rights reserved.</p>
        </div>
    </div>
    </body>
    </html>`;
  return html;
};

const resetEmail = async (email: string, name: string, resetLink: string) => {
  try {
    await transporter.sendMail({
      from: '"PH Health Care🚑" <info@phhealthcare.com>',
      to: email,
      subject: "Reset Password (Expires in 15m)",
      html: resetEmailBody(name, email, resetLink),
    });
  } catch (error) {
    console.log(error);
    throw new AppError(500, "Failed to send email");
  }
};

export default resetEmail;
