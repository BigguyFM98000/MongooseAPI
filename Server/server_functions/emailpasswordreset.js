require('dotenv').config();
const nodemailer = require('nodemailer');

// Create a transporter object using your email service provider's SMTP settings
const transportermailer = nodemailer.createTransport({
    host: process.env.APP_EMAILHOST,
    port: process.env.APP_EMAILPORT,
    secureConnection: false, // TLS requires secureConnection to be false
    auth: {
      user: process.env.APP_EMAIL, // generated ethereal user
      pass: process.env.APP_EMAILPW, // generated ethereal password
    },
    tls: {
        ciphers:'SSLv3'
    }
  });

// Function to send the password reset email
exports.sendPasswordResetEmail = async (email, token) => {
  const mailOptions = {
    from: process.env.APP_EMAIL, // sender address
    to: email, // list of receivers
    subject: "HRConnect Password Reset Link", // Subject line
    text: `To reset your password, click on the following link: http://hr-connect.vercel.app/reset/password/${token}`, // plain text body
  };

  await transportermailer.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Password reset email sent:', info.response);
    }
  });
};
