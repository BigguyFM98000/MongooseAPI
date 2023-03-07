const express = require('express')
const EmployeeController = require('../controllers/employee_controller')
const router = express.Router();

router.get('/', EmployeeController.findAll);
router.get('/:id', EmployeeController.findOne);
router.post('/', EmployeeController.create);
router.put('/:id', EmployeeController.update);
router.delete('/:id', EmployeeController.destroy);

module.exports = router