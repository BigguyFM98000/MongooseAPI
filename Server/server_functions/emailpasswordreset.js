const nodemailer = require('nodemailer');

// Create a transporter object using your email service provider's SMTP settings
const transportermailer = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "fhatuwanibigguy.dev@outlook.com", // generated ethereal user
      pass: "Bigguy@28283385", // generated ethereal password
    },
  });

// Function to send the password reset email
const sendPasswordResetEmail = async (email, token) => {
  const mailOptions = {
    from: 'fhatuwanibigguy.dev@outlook.com', // sender address
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

module.exports = sendPasswordResetEmail;
