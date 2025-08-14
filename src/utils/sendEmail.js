import nodemailer from "nodemailer";

export const sendEmail = async ({
  to = "",
  message = "",
  subject = "",
  attachments = [],
}) => {
  const transporter = nodemailer.createTransport({
    host: "localhost", // or smtp.gmail.com
    port: 587, // or 465 for secured
    secure: false,
    service: "gmail", // optional
    auth: {
      user: process.env.SENDER_EMAIL,
      pass: process.env.SENDER_PASSWORD,
    },
  });
  const info = await transporter.sendMail({
    from: `OMRAN <${process.env.SENDER_EMAIL}>`,
    to,
    html: message,
    subject,
    attachments,
  });
  if (info.accepted.length) {
    return true;
  }
  return false;
};
