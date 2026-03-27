import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { email, subject, type, data } = await req.json();

    if (!email || !subject || !type) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    let htmlContent = '';

    // Email templates based on type
    switch (type) {
      case 'welcome':
        htmlContent = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0f1e; color: white; padding: 40px;">
            <h1 style="color: #ff2d70; font-size: 24px; margin-bottom: 20px;">Welcome to Golf Legacy!</h1>
            <p>Hi ${data.fullName},</p>
            <p>Your account has been created successfully. You're now part of a community combining golf performance tracking with charitable impact.</p>
            <p style="margin: 30px 0;">
              <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" style="background: #8B5CF6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block;">Go to Dashboard</a>
            </p>
            <p>Selected Charity: <strong>${data.charityName}</strong></p>
            <p>Your subscription supports 10% minimum donation to this charity.</p>
            <hr style="border: 1px solid #ff2d70; margin: 30px 0;">
            <p style="font-size: 12px; color: #999;">© 2024 Golf Legacy. All rights reserved.</p>
          </div>
        `;
        break;

      case 'score_confirmed':
        htmlContent = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0f1e; color: white; padding: 40px;">
            <h1 style="color: #ff2d70; font-size: 24px; margin-bottom: 20px;">Score Confirmed ✓</h1>
            <p>Hi ${data.fullName},</p>
            <p>Your golf score has been recorded in our system.</p>
            <div style="background: #1a2037; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ff2d70;">
              <p style="margin: 0;"><strong>Score:</strong> ${data.score} points</p>
              <p style="margin: 10px 0;"><strong>Date:</strong> ${data.date}</p>
              <p style="margin: 10px 0;"><strong>Status:</strong> Active (5-score rolling)</p>
            </div>
            <p>Your latest scores automatically enter you into monthly draws. Keep playing!</p>
            <hr style="border: 1px solid #ff2d70; margin: 30px 0;">
            <p style="font-size: 12px; color: #999;">© 2024 Golf Legacy. All rights reserved.</p>
          </div>
        `;
        break;

      case 'draw_entered':
        htmlContent = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0f1e; color: white; padding: 40px;">
            <h1 style="color: #8B5CF6; font-size: 24px; margin-bottom: 20px;">You're in the Draw! 🎯</h1>
            <p>Hi ${data.fullName},</p>
            <p>Your scores have automatically entered you into the ${data.drawMonth} ${data.drawYear} monthly draw.</p>
            <div style="background: #1a2037; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #8B5CF6;">
              <p style="margin: 0;"><strong>Draw:</strong> ${data.drawMonth} ${data.drawYear}</p>
              <p style="margin: 10px 0;"><strong>Entries:</strong> ${data.entries} matching your scores</p>
              <p style="margin: 10px 0;"><strong>Prize Pool:</strong> £${data.prizePool}</p>
            </div>
            <p>Winners will be announced on the last day of the month. Check back for results!</p>
            <hr style="border: 1px solid #ff2d70; margin: 30px 0;">
            <p style="font-size: 12px; color: #999;">© 2024 Golf Legacy. All rights reserved.</p>
          </div>
        `;
        break;

      case 'winner_notification':
        htmlContent = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0f1e; color: white; padding: 40px;">
            <h1 style="color: #f59e0b; font-size: 24px; margin-bottom: 20px;">🏆 You're a Winner!</h1>
            <p>Hi ${data.fullName},</p>
            <p>Congratulations! Your scores matched in the ${data.drawMonth} draw!</p>
            <div style="background: #1a2037; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
              <p style="margin: 0;"><strong>Match Type:</strong> ${data.matchType}-Number Match</p>
              <p style="margin: 10px 0;"><strong>Prize Amount:</strong> £${data.prizeAmount}</p>
              <p style="margin: 10px 0;"><strong>Status:</strong> Pending Verification</p>
            </div>
            <p>Please upload proof of your scores to complete verification. After admin approval, your winnings will be processed.</p>
            <p style="margin: 30px 0;">
              <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard/winnings" style="background: #f59e0b; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block;">Upload Proof</a>
            </p>
            <hr style="border: 1px solid #ff2d70; margin: 30px 0;">
            <p style="font-size: 12px; color: #999;">© 2024 Golf Legacy. All rights reserved.</p>
          </div>
        `;
        break;

      case 'subscription_activated':
        htmlContent = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0f1e; color: white; padding: 40px;">
            <h1 style="color: #ff2d70; font-size: 24px; margin-bottom: 20px;">Subscription Active ✓</h1>
            <p>Hi ${data.fullName},</p>
            <p>Your subscription to Golf Legacy has been activated successfully!</p>
            <div style="background: #1a2037; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ff2d70;">
              <p style="margin: 0;"><strong>Plan:</strong> ${data.plan}</p>
              <p style="margin: 10px 0;"><strong>Price:</strong> £${data.price}</p>
              <p style="margin: 10px 0;"><strong>Charity Partner:</strong> ${data.charityName}</p>
              <p style="margin: 10px 0;"><strong>Next Billing:</strong> ${data.nextBilling}</p>
            </div>
            <p>You're now eligible for monthly draws and can track your performance. Get scoring!</p>
            <hr style="border: 1px solid #ff2d70; margin: 30px 0;">
            <p style="font-size: 12px; color: #999;">© 2024 Golf Legacy. All rights reserved.</p>
          </div>
        `;
        break;

      case 'charity_impact':
        htmlContent = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0f1e; color: white; padding: 40px;">
            <h1 style="color: #ff2d70; font-size: 24px; margin-bottom: 20px;">Your Impact Report 💚</h1>
            <p>Hi ${data.fullName},</p>
            <p>Here's your monthly impact summary for ${data.month}:</p>
            <div style="background: #1a2037; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ff2d70;">
              <p style="margin: 0;"><strong>Charity:</strong> ${data.charityName}</p>
              <p style="margin: 10px 0;"><strong>Your Contribution:</strong> £${data.contribution}</p>
              <p style="margin: 10px 0;"><strong>Total Charity Fund:</strong> £${data.totalRaised}</p>
            </div>
            <p>Thank you for making a difference while enjoying the game you love!</p>
            <hr style="border: 1px solid #ff2d70; margin: 30px 0;">
            <p style="font-size: 12px; color: #999;">© 2024 Golf Legacy. All rights reserved.</p>
          </div>
        `;
        break;

      default:
        htmlContent = `<p>Hello ${data.fullName}, ${subject}</p>`;
    }

    // Send email via Resend
    const { data: sendData, error: sendError } = await resend.emails.send({
      from: process.env.EMAILS_FROM || 'noreply@golflegacy.com',
      to: email,
      subject: subject,
      html: htmlContent,
    });

    if (sendError) {
      console.error('Email send error:', sendError);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, id: sendData.id });
  } catch (error: any) {
    console.error('Email API error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
