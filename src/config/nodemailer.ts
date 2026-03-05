import { createTransport, Transporter } from "nodemailer";

let cachedTransporter: Transporter | null = null;

export const getTransporter = (): Transporter => {
  if (cachedTransporter) {
    return cachedTransporter;
  }

  const smt_user = process.env.SMTP_USER;
  const smt_pass = process.env.SMTP_PASS;
  const smt_host = process.env.SMTP_HOST;
  const smt_port = process.env.SMTP_PORT;

  if (!smt_user || !smt_pass || !smt_host || !smt_port) {
    throw new Error(
      "SMTP_USER, SMTP_PASS, SMTP_HOST, and SMTP_PORT environment variables must be set",
    );
  }
  cachedTransporter = createTransport({
    host: smt_host,
    port: Number(smt_port),
    secure: true,
    auth: {
      user: smt_user,
      pass: smt_pass,
    },
  });

  return cachedTransporter;
};
