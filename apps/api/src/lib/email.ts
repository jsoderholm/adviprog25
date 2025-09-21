import { Resend } from "resend";
import env from "@/env";

const resend = new Resend(env.RESEND_API_KEY);
const from = "adviprog <no-reply@adviprog.johnsoderholm.com>" as const;

type EmailParams = {
  to: string;
  text: string;
  url: string;
  subject: string;
};

export const email = async ({ to, subject, text, url }: EmailParams) =>
  resend.emails.send({
    from,
    to,
    subject,
    text,
    html: `
<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style='background-color:#ffffff;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif'>
        <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; padding: 30px; border-radius: 8px; border: 1px solid #dddddd;">
            <a href="${url}" style="line-height:100%;text-decoration:none;display:block;max-width:100%;mso-padding-alt:0px;background-color:#5e6ad2;border-radius:3px;font-weight:600;color:#fff;font-size:15px;text-align:center;padding:11px 23px;padding-top:11px;padding-right:23px;padding-bottom:11px;padding-left:23px" target="_blank">
                ${text}
            </a>
        </div>
    </body>
    </html>
    `,
  });
