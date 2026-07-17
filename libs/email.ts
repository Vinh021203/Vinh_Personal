type LeadEmailInput = {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  budget?: string;
  timeline?: string;
  subject?: string;
  message: string;
};

const RESEND_ENDPOINT = "https://api.resend.com/emails";

function escapeHtml(value?: string) {
  return (value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function line(label: string, value?: string) {
  if (!value) return "";
  return `
    <tr>
      <td style="padding:10px 0;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:.08em;font-weight:800;">${escapeHtml(label)}</td>
      <td style="padding:10px 0;color:#111827;font-size:14px;font-weight:700;text-align:right;">${escapeHtml(value)}</td>
    </tr>
  `;
}

function buildLeadEmail(input: LeadEmailInput) {
  const receivedAt = new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" });
  const safeSubject = input.subject || `Lead mới từ ${input.name}`;

  const text = [
    `Lead mới từ VinhWorks`,
    `Thời gian: ${receivedAt}`,
    `Họ tên: ${input.name}`,
    `Email: ${input.email}`,
    input.phone ? `Số điện thoại: ${input.phone}` : "",
    input.company ? `Công ty / thương hiệu: ${input.company}` : "",
    input.service ? `Dịch vụ: ${input.service}` : "",
    input.budget ? `Ngân sách: ${input.budget}` : "",
    input.timeline ? `Thời gian: ${input.timeline}` : "",
    "",
    `Nội dung:`,
    input.message,
  ].filter(Boolean).join("\n");

  const html = `
    <div style="margin:0;background:#fff8e9;padding:32px;font-family:Arial,Helvetica,sans-serif;color:#111827;">
      <div style="max-width:680px;margin:0 auto;border:1px solid #111827;background:#ffffff;box-shadow:8px 8px 0 #ffb21c;">
        <div style="background:#09090b;color:#ffffff;padding:24px;border-bottom:1px solid #111827;">
          <p style="margin:0 0 8px;color:#ffb21c;font-size:12px;font-weight:900;letter-spacing:.18em;text-transform:uppercase;">VinhWorks Lead</p>
          <h1 style="margin:0;font-size:28px;line-height:1.1;">Có yêu cầu liên hệ mới</h1>
          <p style="margin:10px 0 0;color:#d1d5db;font-size:14px;">${escapeHtml(receivedAt)}</p>
        </div>
        <div style="padding:24px;">
          <table style="width:100%;border-collapse:collapse;border-bottom:1px solid #e5e7eb;margin-bottom:22px;">
            ${line("Họ tên", input.name)}
            ${line("Email", input.email)}
            ${line("Số điện thoại", input.phone)}
            ${line("Công ty / thương hiệu", input.company)}
            ${line("Dịch vụ", input.service)}
            ${line("Ngân sách", input.budget)}
            ${line("Thời gian", input.timeline)}
          </table>
          <p style="margin:0 0 10px;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:.08em;font-weight:800;">Nội dung</p>
          <div style="white-space:pre-line;border:1px solid #111827;background:#fff8e9;padding:18px;font-size:15px;line-height:1.7;color:#111827;">${escapeHtml(input.message)}</div>
        </div>
      </div>
    </div>
  `;

  return { subject: safeSubject, text, html };
}

export async function sendLeadEmail(input: LeadEmailInput) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL || "VinhWorks <onboarding@resend.dev>";
  const to = process.env.RESEND_TO_EMAIL || process.env.CONTACT_EMAIL;

  if (!apiKey || !to) {
    console.warn("Resend env is missing. Lead was saved but email was skipped.");
    return { skipped: true };
  }

  const email = buildLeadEmail(input);
  const response = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: input.email,
      subject: email.subject,
      html: email.html,
      text: email.text,
    }),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(text || "Resend send failed");
  }

  return { skipped: false };
}
