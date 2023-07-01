const express = require('express');
const ForgotPasswordController = require('../controllers/forgot_password');
const router = express.Router();

router.get("/status", (req, res) => {
    res.status(200).json({message: "Reset route is successfully listening!!!!" });
});

router.post("/forgotpassword", ForgotPasswordController.send);
router.get("/form/:token", ForgotPasswordController.redirect);
router.post("/password", ForgotPasswordController.resetform);

module.exports = router;