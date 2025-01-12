const express = require('express');
const { body, param, query } = require('express-validator');
const StudentController = require('../controllers/studentController');

const router = express.Router();

// Get paginated students
router.get(
  '/',
  [
    // query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
    query('limit').optional().isInt({ min: 1 }).withMessage('Limit must be a positive integer'),
    //cursor
    //direction
  ],
  StudentController.getPaginatedStudents
);

// Get a student by ID
router.get(
  '/:id',
  [param('id').isInt().withMessage('Student ID must be an integer')],
  StudentController.getStudentById
  
);

// Create a new student
router.post(
  '/',
  [
    body('name').isString().notEmpty().withMessage('Name is required and must be a non-empty string'),
    body('age').isInt({ min: 18, max: 100 }).withMessage('Age is required and must be between 18 and 100'),
    body('institute_id').isInt().withMessage('Institute ID is required and must be an integer'),
  ],
  StudentController.createStudent
);

// Update a student by ID
router.put(
  '/:id',
  [
    param('id').isInt().withMessage('Student ID must be an integer'),
    body('name').optional().isString().notEmpty().withMessage('Name must be a non-empty string'),
    body('age').optional().isInt({ min: 18, max: 100 }).withMessage('Age must be between 18 and 100'),
    body('institute_id').optional().isInt().withMessage('Institute ID must be an integer'),
  ],
  StudentController.updateStudent
);

// Delete a student by ID
router.delete(
  '/:id',
  [param('id').isInt().withMessage('Student ID must be an integer')],
  StudentController.deleteStudent
);

module.exports = router;
