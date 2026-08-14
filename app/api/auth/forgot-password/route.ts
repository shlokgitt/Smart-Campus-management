import { NextResponse } from "next/server";
import crypto from "crypto";
import { Resend } from "resend";

import { connectDB } from "@/lib/db";
import User from "@/lib/models/User";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    await connectDB();

    const normalizedEmail = email.trim().toLowerCase();

    const user = await User.findOne({
      email: normalizedEmail,
    });

    /*
     * Always return the same response whether the account exists.
     * This prevents email/account enumeration.
     */
    if (!user) {
      return NextResponse.json({
        message:
          "If an account exists with this email, a password reset link has been sent.",
      });
    }

    /*
     * Google-only accounts don't have a password to reset.
     */
    if (!user.password) {
      return NextResponse.json({
        message:
          "If an account exists with this email, a password reset link has been sent.",
      });
    }

    // Generate a cryptographically secure random token.
    const rawToken = crypto.randomBytes(32).toString("hex");

    // Store only the hash of the token.
    const hashedToken = crypto
      .createHash("sha256")
      .update(rawToken)
      .digest("hex");

    // Token expires after 15 minutes.
    const expires = new Date(Date.now() + 15 * 60 * 1000);

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = expires;

    await user.save();

    // Application URL
    const baseUrl =
      process.env.NEXTAUTH_URL || "http://localhost:3000";

    // Create reset URL.
    const resetUrl =
      `${baseUrl}/reset-password?token=${rawToken}&email=${encodeURIComponent(
        normalizedEmail
      )}`;

    // Send password reset email.
    const { error } = await resend.emails.send({
      from: "Smart Campus <onboarding@resend.dev>",
      to: [normalizedEmail],
      subject: "Reset your Smart Campus password",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Reset your Smart Campus password</title>
          </head>

          <body
            style="
              margin: 0;
              padding: 0;
              background-color: #eeeae2;
              font-family: Arial, Helvetica, sans-serif;
              color: #181816;
            "
          >
            <div style="padding: 40px 20px;">
              <div
                style="
                  max-width: 560px;
                  margin: 0 auto;
                  background-color: #f8f5ee;
                  border: 1px solid #d2cabc;
                  padding: 40px;
                "
              >

                <div style="margin-bottom: 30px;">
                  <div
                    style="
                      display: inline-block;
                      background-color: #171715;
                      color: #d0b47a;
                      padding: 12px 15px;
                      font-size: 20px;
                      font-weight: bold;
                    "
                  >
                    S
                  </div>

                  <div
                    style="
                      display: inline-block;
                      vertical-align: top;
                      margin-left: 10px;
                    "
                  >
                    <div
                      style="
                        font-size: 18px;
                        font-weight: bold;
                        margin-bottom: 3px;
                      "
                    >
                      Smart Campus
                    </div>

                    <div
                      style="
                        font-size: 10px;
                        letter-spacing: 2px;
                        color: #81796c;
                        text-transform: uppercase;
                      "
                    >
                      Management System
                    </div>
                  </div>
                </div>

                <div
                  style="
                    height: 1px;
                    background-color: #d2cabc;
                    margin-bottom: 30px;
                  "
                ></div>

                <p
                  style="
                    margin: 0 0 10px;
                    font-size: 11px;
                    font-weight: bold;
                    letter-spacing: 2px;
                    text-transform: uppercase;
                    color: #8b7042;
                  "
                >
                  Account recovery
                </p>

                <h1
                  style="
                    margin: 0 0 16px;
                    font-size: 30px;
                    line-height: 1.25;
                    color: #181816;
                  "
                >
                  Reset your password
                </h1>

                <p
                  style="
                    margin: 0 0 24px;
                    font-size: 15px;
                    line-height: 1.7;
                    color: #706b62;
                  "
                >
                  We received a request to reset the password for your
                  Smart Campus account.
                </p>

                <p
                  style="
                    margin: 0 0 28px;
                    font-size: 15px;
                    line-height: 1.7;
                    color: #706b62;
                  "
                >
                  Click the button below to create a new password.
                  This link will expire in 15 minutes.
                </p>

                <a
                  href="${resetUrl}"
                  style="
                    display: inline-block;
                    background-color: #181816;
                    color: #f5f0e6;
                    text-decoration: none;
                    padding: 14px 24px;
                    font-size: 14px;
                    font-weight: bold;
                  "
                >
                  Reset Password
                </a>

                <p
                  style="
                    margin: 30px 0 8px;
                    font-size: 13px;
                    line-height: 1.6;
                    color: #81796c;
                  "
                >
                  If you did not request a password reset, you can safely
                  ignore this email.
                </p>

                <p
                  style="
                    margin: 0;
                    font-size: 13px;
                    line-height: 1.6;
                    color: #81796c;
                  "
                >
                  For security, this link can only be used once.
                </p>

                <div
                  style="
                    height: 1px;
                    background-color: #d2cabc;
                    margin: 30px 0 20px;
                  "
                ></div>

                <p
                  style="
                    margin: 0;
                    font-size: 10px;
                    letter-spacing: 1.5px;
                    text-transform: uppercase;
                    color: #a29a8c;
                  "
                >
                  Smart Campus Management System
                </p>

              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error("Resend email error:", error);

      // Remove the reset token because the email was not sent.
      user.resetPasswordToken = null;
      user.resetPasswordExpires = null;

      await user.save();

      return NextResponse.json(
        { error: "Unable to send password reset email." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message:
        "If an account exists with this email, a password reset link has been sent.",
    });
  } catch (error) {
    console.error("Forgot password error:", error);

    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}