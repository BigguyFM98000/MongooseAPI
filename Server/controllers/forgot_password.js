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
  const oneHourAfter = new Date();
  oneHourAfter.setHours(oneHourAfter.getHours() + 1); // add one hour to curerent time
  const resetTokenExpiration = oneHourAfter.toString();

  try {
    const user = await UserModel.findOne({ email });
    console.log(user);
    if (!user) {
      // Handle case where user with the provided email doesn't exist
      return res.status(404).json({ message: 'Email provided not registered in the application.' });
    }
    user.resetToken = verificationCode;
    user.resetTokenSentTime = TokenSentTime;
    user.resetTokenExpirationTime = resetTokenExpiration;

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
    }).then((res) => {
      console.log(res);
      res.status(200).json({ data: res });
    });

    const timeNow = new Date();
    if (timeNow < resetTokenExpiration.resetTokenExpiration) {
      // Render the password reset page
      res.render('reset-password', { token });
    } else {
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
  try {
    const newPassword = req.body.password;
    const token = req.body.token;
    const resetTokenExpirationTime = req.body.resetTokenExpirationTime;

    let user = await UserModel.findOne({ token });

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const body = JSON.stringify({
      token,
      password: hashedPassword,
      resetTokenExpirationTime,
    })
    const updatedUser = await UserModel.findByIdAndUpdate(user._id, body, { useFindAndModify: false });

    res.status(200).json({ message: 'Password reset successful.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
};
