const express = require('express')
const ForgotPasswordController = require('../controllers/forgot_password');
const router = express.Router();

router.post("/forgot-password", ForgotPasswordController.send);
router.get("reset-password/:token", ForgotPasswordController.redirect);
router.post("/reset-password/:token", ForgotPasswordController.resetform);

module.exports = router;