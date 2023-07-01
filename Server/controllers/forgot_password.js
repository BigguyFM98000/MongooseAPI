const UserModel = require('../models/user_model');
const sendPasswordResetEmail = require('../server_functions/emailpasswordreset');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const addHours = (date, hours) => {
  date.setTime(date.getTime() + hours * 60 * 60 * 1000);
  return date;
}

// Step 1: Create a route for the "Forgot Password" form submission
exports.send = async (req, res) => {
  const { email } = req.body;

  const verifyCode = crypto.randomBytes(35).toString('hex');
    const verificationCode = crypto
      .createHash('sha256')
      .update(verifyCode)
      .digest('hex');

  const TokenSentTime = new Date().toString(); // time link is sent   
  // const expirationTime = Date.now() + 3600000; 

  

  try {
    const user = await UserModel.findOne({ email });
    console.log(user);
    if (!user) {
      // Handle case where user with the provided email doesn't exist
      return res.status(404).json({ message: 'Email provided not registered in the application.' });
    }
    user.resetToken = verificationCode;
    user.resetTokenSentTime = TokenSentTime;

    // Step 3: Send an email with the password reset link containing the token
    sendPasswordResetEmail.sendPasswordResetEmail(email, verificationCode);

    res.json({ message: 'Password reset email sent.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while sending reset lint to email' });
  }
}

// Step 4: Create a route for the password reset page
exports.redirect = async (req, res) => {
  const { token } = req.params.token;

  try {
    const user = await UserModel.findOne({
      resetToken: resetToken,
      resetTokenExpiration: resetTokenExpiration
    });

    const timeNow = new Date();
    if (timeNow < resetTokenExpiration.resetTokenExpiration) {
      // Render the password reset page
      res.render('reset-password', { token });
    }else{
      // Handle case of expired token being sent
      return res.status(400).json({ message: 'Invalid or expired token.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
}

// Step 5: Create a route to handle the password reset form submission
exports.resetform = async (req, res) => {
  const token = req.body.token;
  const password = req.body.password;
  const email = req.body.email;

  try {
    const user = await UserModel.findOne({
      resetToken: token,
      email: email
    });
    if (!user) {
      // Handle case where token is invalid or expired
      return res.status(400).json({ message: 'Invalid or expired token.' });
    }

    // Update the user's password and clear the reset token fields
    user.password = await bcrypt.hash(password, 10);
    user.resetTokenExpirationTime = new Date().toString();
    await UserModel.save();

    res.json({ message: 'Password reset successful.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' }); 
  }
}
