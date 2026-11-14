const express = require('express');
const router = express.Router();
const auth = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const {
  registerValidation,
  loginValidation,
} = require('../validations/authValidation');

router.post('/register', registerValidation, auth.register);
router.post('/login', loginValidation, auth.login);
router.get('/me', protect, auth.getMe);

module.exports = router;