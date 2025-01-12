const instituteService = require('../services/instituteService');

// Get all institutes
const getAllInstitutes = async (req, res) => {
  try {
    const institutes = await instituteService.getAllInstitutes();
    res.status(200).json(institutes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching institutes', error });
  }
};

// Get a specific institute by ID
const getInstituteById = async (req, res) => {
  const { id } = req.params;
  try {
    const institute = await instituteService.getInstituteById(id);
    if (!institute) {
      return res.status(404).json({ message: 'Institute not found' });
    }
    res.status(200).json(institute);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching institute', error });
  }
};

// Create a new institute
const createInstitute = async (req, res) => {
  const { name, address, contactNumber } = req.body;
  try {
    const newInstitute = await instituteService.createInstitute({
      name,
      address,
      contactNumber,
    });
    res.status(201).json(newInstitute);
  } catch (error) {
    res.status(500).json({ message: 'Error creating institute', error });
  }
};

// Update an institute
const updateInstitute = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const updatedInstitute = await instituteService.updateInstitute(id, data);
    if (!updatedInstitute) {
      return res.status(404).json({ message: 'Institute not found' });
    }
    res.status(200).json(updatedInstitute);
  } catch (error) {
    res.status(500).json({ message: 'Error updating institute', error });
  }
};

// Delete an institute
const deleteInstitute = async (req, res) => {
  const { id } = req.params;
  try {
    const isDeleted = await instituteService.deleteInstitute(id);
    if (!isDeleted) {
      return res.status(404).json({ message: 'Institute not found' });
    }
    res.status(200).json({ message: 'Institute deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting institute', error });
  }
};

module.exports = {
  getAllInstitutes,
  getInstituteById,
  createInstitute,
  updateInstitute,
  deleteInstitute,
};
