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
  const newPassword = req.body.password;
  const token = req.body.token;
  const resetTokenExpirationTime = req.body.resetTokenExpirationTime;
  let userId;
  let hashedPassword;

  const useDetails = await UserModel.findOne({ token })
    .then((res) => {
      userId = res._id;
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: 'Server error.' });
    });

  try {
    hashedPassword = await bcrypt.hash(newPassword, 10);
    // Update the user's password and clear the reset token fields
    const body = {
      token: token,
      password: hashedPassword,
      resetTokenExpirationTime: resetTokenExpirationTime,
    };
    console.log(userId);
    await UserModel.findByIdAndUpdate(userId, body, { useFindAndModify: false }).then((data) => {
      res.status(200).json({ message: 'Password reset successful.' });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
};
