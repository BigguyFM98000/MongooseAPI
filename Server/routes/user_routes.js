const express = require('express')
const UserController = require('../controllers/user_controller')
const router = express.Router();

router.get('/status', (req, res) => {
    res.json({message: "User api is successfully live!!!!" });
});
router.get('/:id', UserController.findOne);
router.put('/:id', UserController.update);
router.delete('/:id', UserController.destroy);

module.exports = router