const express = require('express');
const router = express.Router();
const controller = require('../controllers/reportController');

// Define API routes
router.get('/institutes', controller.getInstitutes);
router.get('/students', controller.getStudents);
router.get('/courses', controller.getCourses);
router.get('/results', controller.getResults);
router.get('/results/institute/:instituteId', controller.getResultsByInstitute);
router.get('/courses/top', controller.getTopCoursesByYear); // Pass year as query param
router.get('/students/top', controller.getTopStudents);

module.exports = router;
