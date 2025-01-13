const express = require('express');
const ResultController = require('../controllers/resultController');
const router = express.Router();

// Create a new result
router.post('/', ResultController.createResult);

// Get a single result by ID
router.get('/:id', ResultController.getResultById);

// Get all results with pagination
router.get('/', ResultController.getAllResults);

// Update an existing result by ID
router.put('/:id', ResultController.updateResult);

// Delete a result by ID
router.delete('/:id', ResultController.deleteResult);

module.exports = router;
