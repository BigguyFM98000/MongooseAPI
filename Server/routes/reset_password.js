const express = require('express')
const ForgotPasswordController = require('../controllers/forgot_password');
const router = express.Router();

router.get("/status", (req, res) => {
    res.json({message: "Welcome to Reset API" });
});
router.post("/forgotpassword", ForgotPasswordController.send);
router.get("/form/:token", ForgotPasswordController.redirect);
router.post("/password/:token", ForgotPasswordController.resetform);

module.exports = router;