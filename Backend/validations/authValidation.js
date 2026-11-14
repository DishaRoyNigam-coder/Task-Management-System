const { body } = require('express-validator');

exports.registerValidation = [
  body('name').trim().isLength({ min: 2 }).withMessage('Name too short'),
  body('email').isEmail().withMessage('Valid email required').normalizeEmail(),
  body('password').isLength({ min: 6 }).withMessage('Password min 6 chars'),
];

exports.loginValidation = [
  body('email').isEmail().withMessage('Valid email required').normalizeEmail(),
  body('password').notEmpty().withMessage('Password required'),
];