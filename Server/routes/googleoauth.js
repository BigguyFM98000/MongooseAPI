const express = require('express');
const GoogleService = require("../controllers/google_controller");
const router = express.Router();

router.get('/status', (req, res) => {
    res.status(200).json({message: "Google route is successfully listening!!!!" });
});

router.post('/signin', GoogleService.google_signin);

module.exports = router;
