const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');
const { taskValidation } = require('../validations/taskValidation');

router.use(protect); // all task routes protected

router.route('/').get(ctrl.getTasks).post(taskValidation, ctrl.createTask);
router
  .route('/:id')
  .get(ctrl.getTask)
  .put(taskValidation, ctrl.updateTask)
  .delete(ctrl.deleteTask);

module.exports = router;