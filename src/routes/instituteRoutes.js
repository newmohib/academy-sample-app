const express = require('express')
const instituteController = require('../controllers/instituteController');

const router = express.Router();

// Get all institutes
router.get('/', instituteController.getAllInstitutes);

// Get a specific institute by ID
router.get('/:id', instituteController.getInstituteById);

// Create a new institute
router.post('/', instituteController.createInstitute);

// Update an institute
router.put('/:id', instituteController.updateInstitute);

// Delete an institute
router.delete('/:id', instituteController.deleteInstitute);

module.exports = router;
