const { body } = require('express-validator');

exports.taskValidation = [
  body('title').trim().isLength({ min: 3 }).withMessage('Title too short'),
  body('description').optional().isLength({ max: 1000 }),
  body('status')
    .optional()
    .isIn(['Pending', 'In Progress', 'Completed'])
    .withMessage('Invalid status'),
];