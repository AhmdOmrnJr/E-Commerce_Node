import nodemailer from "nodemailer";

async function sendEmail({ to = '', subject = '', message = '', attachments = [] } = {}) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.SENDER_EMAIL, // generated ethereal user
            pass: process.env.SENDER_PASSWORD, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: `"Omran" <${process.env.SENDER_EMAIL}>`, // sender address
        to,
        subject,
        html:message,
        attachments
    });

    return info.accepted.length ? false : true
}



export default sendEmail