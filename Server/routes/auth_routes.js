const express = require('express');
const AuthController = require('../controllers/auth');
const router = express.Router();

router.get('/status', (req, res) => {
    res.status(200).json({message: "Auth route is successfully listening!!!!" });
});

router.post('/signup', AuthController.signup);
router.post('/signin', AuthController.signin);

module.exports = router