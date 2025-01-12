const express = require('express');
const ResultController = require('../controllers/resultController');
const router = express.Router();

// Create a new result
router.post('/results', ResultController.createResult);

// Get a single result by ID
router.get('/results/:id', ResultController.getResultById);

// Get all results with pagination
router.get('/results', ResultController.getAllResults);

// Update an existing result by ID
router.put('/results/:id', ResultController.updateResult);

// Delete a result by ID
router.delete('/results/:id', ResultController.deleteResult);

module.exports = router;
