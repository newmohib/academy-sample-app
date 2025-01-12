const express = require('express');
const { signup, signin } = require('../controllers/authController');
const { body } = require('express-validator');
const handleValidationErrors = require('../middlewares/handleValidationErrors');

const router = express.Router();

router.post('/signup', [
  body('username').isString().notEmpty().withMessage('Username is required'),
  body('password').isString().notEmpty().withMessage('Password is required')
], handleValidationErrors, signup);

router.post('/signin', [
  body('username').isString().notEmpty().withMessage('Username is required'),
  body('password').isString().notEmpty().withMessage('Password is required')
], handleValidationErrors, signin);

module.exports = router;
