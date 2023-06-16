const express = require('express')
const UserController = require('../controllers/user_controller')
const router = express.Router();

router.get('/status', (req, res) => {
    res.status(200).json({message: "Users route is successfully live!!!!" });
});

router.get('/:id', UserController.findOne);
router.put('/:id', UserController.update);
router.delete('/:id', UserController.destroy);
router.get('/', UserController.findAll);

module.exports = router