const Institute = require('../models/instituteModel');

/**
 * Get all institutes
 */
const getAllInstitutes = async () => {
  return await Institute.query();
};

/**
 * Get an institute by ID
 */
const getInstituteById = async (id) => {
  return await Institute.query().findById(id);
};

/**
 * Create a new institute
 */
const createInstitute = async (data) => {
  return await Institute.query().insert(data);
};
  /**
 * Update an existing institute by ID
 */
const updateInstitute = async (id, data) => {
    return await Institute.query().findById(id).patch(data);
};

  /**
   * Delete an institute by ID
   */
  const deleteInstitute = async (id) => {
    const rowsDeleted = await Institute.query().deleteById(id);
    return rowsDeleted > 0;
  };
  
  module.exports = {
    getAllInstitutes,
    getInstituteById,
    createInstitute,
    updateInstitute,
    deleteInstitute,
  };
  