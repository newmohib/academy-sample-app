const express = require('express');
const { signup, signin } = require('../controllers/authController');
const { body } = require('express-validator');
const handleValidationErrors = require('../middlewares/handleValidationErrors');

const router = express.Router();

router.post('/signup', [
  body('email').isString().notEmpty().withMessage('email is required'),
  body('password').isString().notEmpty().withMessage('Password is required')
], handleValidationErrors, signup);

router.post('/signin', [
  body('email').isString().notEmpty().withMessage('email is required'),
  body('password').isString().notEmpty().withMessage('Password is required')
], handleValidationErrors, signin);

module.exports = router;
