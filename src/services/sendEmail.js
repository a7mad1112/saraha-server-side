import nodemailer from "nodemailer";

async function sendEmail(to, subject, html) {
  const { SEND_EMAIL, SEND_PASSWORD } = process.env
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: SEND_EMAIL,
      pass: SEND_PASSWORD,
    },
  });

  // async..await is not allowed in global scope, must use a wrapper
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: `"Saraha Application 👻" <${SEND_EMAIL}>`, // sender address
    to, // list of receivers
    subject, // Subject line
    html, // html body
  });
}

export default sendEmail