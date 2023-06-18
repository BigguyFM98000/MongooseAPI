const UserModel = require('../models/user_model');
const sendPasswordResetEmail = require('../server_functions/emailpasswordreset');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

// Step 1: Create a route for the "Forgot Password" form submission
exports.send = async (req, res) => {
  const { email } = req.body;

  const verifyCode = crypto.randomBytes(35).toString('hex');
    const verificationCode = crypto
      .createHash('sha256')
      .update(verifyCode)
      .digest('hex');

  const expirationTime = Date.now() + 3600000; // 1 hour from now

  try {
    const user = await UserModel.findOneAndUpdate(
      { email },
      { resetToken: verificationCode, resetTokenExpiration: expirationTime }
    );

    if (!user) {
      // Handle case where user with the provided email doesn't exist
      return res.status(404).json({ message: 'User not found.' });
    }

    // Step 3: Send an email with the password reset link containing the token
    sendPasswordResetEmail.sendPasswordResetEmail(email, verificationCode);

    res.json({ message: 'Password reset email sent.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
}

// Step 4: Create a route for the password reset page
exports.redirect = async (req, res) => {
  const { token } = req.params;

  try {
    const user = await UserModel.findOne({
      resetToken: token,
      resetTokenExpiration: { $gt: Date.now() }
    });

    if (!user) {
      // Handle case where token is invalid or expired
      return res.status(400).json({ message: 'Invalid or expired token.' });
    }

    // Render the password reset page
    res.render('reset-password', { token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
}

// Step 5: Create a route to handle the password reset form submission
exports.resetform = async (req, res) => {
  const { token } = req.params.token;
  const { password } = req.body.password;

  try {
    const user = await UserModel.findOne({
      resetToken: token,
      resetTokenExpiration: { $gt: Date.now() }
    });

    if (!user) {
      // Handle case where token is invalid or expired
      return res.status(400).json({ message: 'Invalid or expired token.' });
    }

    // Update the user's password and clear the reset token fields
    user.password = await bcrypt.hash(password, 10);
    user.resetToken = undefined;
    user.resetTokenExpiration = undefined;
    await UserModel.save();

    res.json({ message: 'Password reset successful.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
}
