const express = require('express');
const GoogleController = require('../controllers/google_controller');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.get('/status', (req, res) => {
    res.status(200).json({message: "Google route is successfully listening!!!!" });
});

router.post('/', GoogleController.create);
router.put('/:id', GoogleController.update);
router.get('/', GoogleController.view);
router.post(
    '/profile-image',
    upload.single('image'),
    GoogleController.uploadProfileImage
);

module.exports = router;