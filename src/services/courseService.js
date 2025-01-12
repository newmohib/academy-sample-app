const Course = require('../models/Course');

/**
 * Get all courses
 */
const getAllCourses = async () => {
  return await Course.query();
};

/**
 * Create a new course
 */
const createCourse = async (data) => {
  return await Course.query().insert(data);
};

/**
 * Get a course by ID
 */
const getCourseById = async (id) => {
  return await Course.query().findById(id);
};

/**
 * Update a course by ID
 */
const updateCourse = async (id, data) => {
  return await Course.query().patchAndFetchById(id, data);
};

/**
 * Delete a course by ID
 */
const deleteCourse = async (id) => {
  const rowsDeleted = await Course.query().deleteById(id);
  return rowsDeleted > 0;
};

module.exports = {
  getAllCourses,
  createCourse,
  getCourseById,
  updateCourse,
  deleteCourse,
};
