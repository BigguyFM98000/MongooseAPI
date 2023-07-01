const express = require('express');
const EmployeeController = require('../controllers/employee_controller');
const router = express.Router();

router.get('/status', (req, res) => {
    res.status(200).json({ message: "Employees route is successfully listening!!!!" });
});

router.get('/files/:userId', EmployeeController.findAll);
router.get('/:id', EmployeeController.findOne);
router.post('/add', EmployeeController.create);
router.put('/:id', EmployeeController.update);
router.delete('/:id', EmployeeController.destroy);

module.exports = router;