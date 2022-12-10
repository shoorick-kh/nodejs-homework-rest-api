const nodemailer = require('nodemailer');

async function sendingMail(receiver, verificationToken) {
  const transport = nodemailer.createTransport({
    host: 'smtp.meta.ua',
    port: 465,
    secure: true,
    auth: {
      user: 'alex-post@meta.ua',
      pass: process.env.PASS_META,
    },
  });

  const email = {
    from: 'alex-post@meta.ua',
    to: `${receiver}`,
    subject: 'Verify user',
    html: `<a href="http://localhost:3000/api/users/verify/${verificationToken}">Verify your email!<a>`,
    text: 'Verify user',
  };

  const response = await transport.sendMail(email);
  console.log('Email sent', response);
}

module.exports = {
  sendingMail,
};
