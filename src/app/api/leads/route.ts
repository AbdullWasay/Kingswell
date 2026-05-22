import { NextResponse } from "next/server";
import siteData from "../../../../content/site.json";

/**
 * Lead capture API — connects to email & CRM
 *
 * Production setup:
 * - Set CRM_PROVIDER env (alto | reapit | street)
 * - Set CRM_API_KEY and CRM_WEBHOOK_URL
 * - Set RESEND_API_KEY or SMTP for email notifications
 * - Set LEADS_EMAIL for inbox delivery
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const lead = {
      ...body,
      receivedAt: new Date().toISOString(),
      source: "kingswell-website",
    };

    // Email notification (configure RESEND_API_KEY in production)
    const leadsEmail = process.env.LEADS_EMAIL || siteData.email;

    if (process.env.RESEND_API_KEY) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Kingswell Website <leads@kingswellagents.co.uk>",
          to: leadsEmail,
          subject: `New ${body.formType} enquiry from ${body.firstName} ${body.lastName}`,
          html: `<pre>${JSON.stringify(lead, null, 2)}</pre>`,
        }),
      });
    }

    // CRM webhook (Alto / Reapit / Street)
    const crmWebhook = process.env.CRM_WEBHOOK_URL;
    if (crmWebhook) {
      await fetch(crmWebhook, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.CRM_API_KEY || ""}`,
        },
        body: JSON.stringify({
          provider: process.env.CRM_PROVIDER || "generic",
          lead,
        }),
      });
    }

    // Log in development
    if (process.env.NODE_ENV === "development") {
      console.log("[Lead captured]", lead);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Lead error]", error);
    return NextResponse.json(
      { error: "Failed to submit" },
      { status: 500 }
    );
  }
}
