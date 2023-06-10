require('dotenv').config();
const nodemailer = require('nodemailer');

// Create a transporter object using your email service provider's SMTP settings
const transportermailer = nodemailer.createTransport({
    host: process.env.APP_EMAILHOST,
    port: process.env.APP_EMAILPORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.APP_EMAIL, // generated ethereal user
      pass: process.env.APP_EMAILPW, // generated ethereal password
    },
  });

// Function to send the password reset email
exports.sendPasswordResetEmail = async (email, token) => {
  const mailOptions = {
    from: process.env.APP_EMAIL, // sender address
    to: email, // list of receivers
    subject: "Password Reset", // Subject line
    text: `To reset your password, click on the following link: http://hr-connect.vercel.app/reset-password/${token}`, // plain text body
  };

  const info = await transportermailer.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Password reset email sent:', info.response);
    }
  });

  info();
};
