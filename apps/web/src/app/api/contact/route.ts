import { Resend } from "resend";

export const runtime = "nodejs";

const resend = new Resend(process.env.RESEND_API_KEY);

type ContactPayload = {
  name?: string;
  email?: string;
  company?: string;
  service?: string;
  message?: string;
  privacy?: boolean;
  website?: string; // honeypot
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload;

    const name = body.name?.trim() ?? "";
    const email = body.email?.trim() ?? "";
    const company = body.company?.trim() ?? "";
    const service = body.service?.trim() ?? "";
    const message = body.message?.trim() ?? "";
    const privacy = Boolean(body.privacy);
    const website = body.website?.trim() ?? "";

    if (website) {
      return Response.json({ success: true });
    }

    if (!name || !email || !message) {
      return Response.json(
        { success: false, error: "Compila nome, email e messaggio." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return Response.json(
        { success: false, error: "Inserisci un indirizzo email valido." },
        { status: 400 }
      );
    }

    if (!privacy) {
      return Response.json(
        {
          success: false,
          error: "Devi accettare l’informativa privacy per inviare il messaggio.",
        },
        { status: 400 }
      );
    }

    if (!process.env.CONTACT_TO_EMAIL || !process.env.CONTACT_FROM_EMAIL) {
      return Response.json(
        {
          success: false,
          error: "Configurazione email incompleta sul server.",
        },
        { status: 500 }
      );
    }

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeCompany = escapeHtml(company || "—");
    const safeService = escapeHtml(service || "—");
    const safeMessage = escapeHtml(message).replaceAll("\n", "<br />");

    const subject = `Nuovo contatto dal sito — ${name}`;

    const html = `
      <div style="background:#06081a;padding:32px;font-family:Arial,sans-serif;color:#f5f7fb;">
        <div style="max-width:680px;margin:0 auto;border:1px solid rgba(255,255,255,0.08);border-radius:24px;overflow:hidden;background:#020233;">
          <div style="padding:32px 28px;border-bottom:1px solid rgba(255,255,255,0.08);background:
            radial-gradient(circle at 18% 18%, rgba(16,74,156,0.28), transparent 28%),
            radial-gradient(circle at 82% 24%, rgba(238,98,36,0.16), transparent 22%),
            linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.015)),
            #020233;">
            <p style="margin:0 0 10px;font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:rgba(255,255,255,0.6);">
              Nuovo messaggio dal sito Kerning
            </p>
            <h1 style="margin:0;font-size:28px;line-height:1.1;letter-spacing:0.03em;color:#ffffff;">
              Richiesta contatto
            </h1>
          </div>

          <div style="padding:28px;">
            <table style="width:100%;border-collapse:collapse;">
              <tr>
                <td style="padding:0 0 14px;color:rgba(255,255,255,0.62);font-size:12px;letter-spacing:0.14em;text-transform:uppercase;">Nome</td>
                <td style="padding:0 0 14px;color:#ffffff;font-size:16px;">${safeName}</td>
              </tr>
              <tr>
                <td style="padding:0 0 14px;color:rgba(255,255,255,0.62);font-size:12px;letter-spacing:0.14em;text-transform:uppercase;">Email</td>
                <td style="padding:0 0 14px;color:#ffffff;font-size:16px;">${safeEmail}</td>
              </tr>
              <tr>
                <td style="padding:0 0 14px;color:rgba(255,255,255,0.62);font-size:12px;letter-spacing:0.14em;text-transform:uppercase;">Azienda</td>
                <td style="padding:0 0 14px;color:#ffffff;font-size:16px;">${safeCompany}</td>
              </tr>
              <tr>
                <td style="padding:0 0 14px;color:rgba(255,255,255,0.62);font-size:12px;letter-spacing:0.14em;text-transform:uppercase;">Servizio</td>
                <td style="padding:0 0 14px;color:#ffffff;font-size:16px;">${safeService}</td>
              </tr>
            </table>

            <div style="margin-top:18px;padding:18px 18px;border-radius:18px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);">
              <p style="margin:0 0 10px;color:rgba(255,255,255,0.62);font-size:12px;letter-spacing:0.14em;text-transform:uppercase;">
                Messaggio
              </p>
              <p style="margin:0;color:#ffffff;font-size:15px;line-height:1.8;">
                ${safeMessage}
              </p>
            </div>
          </div>
        </div>
      </div>
    `;

    const { data, error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL,
      to: [process.env.CONTACT_TO_EMAIL],
      subject,
      html,
      replyTo: email,
    });

    if (error) {
      return Response.json(
        { success: false, error: "Invio email non riuscito.", details: error },
        { status: 500 }
      );
    }

    return Response.json({ success: true, id: data?.id ?? null });
  } catch (error) {
    console.error("CONTACT_API_ERROR", error);

    return Response.json(
      {
        success: false,
        error: "Si è verificato un errore durante l’invio del messaggio.",
      },
      { status: 500 }
    );
  }
}