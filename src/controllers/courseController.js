const CourseService = require('../services/courseService');

/**
 * Get all courses
 */
const getAllCourses = async (req, res) => {
  try {
    const courses = await CourseService.getAllCourses();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Create a new course
 */

const createCourse = async (req, res) => {
  try {
    const { name, description, institute_id } = req.body;
    const newCourse = await CourseService.createCourse({ name, description, institute_id });
    res.status(201).json(newCourse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Get a specific course by ID
 */
const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await CourseService.getCourseById(id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Update a course by ID
 */
const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, duration } = req.body;
    const updatedCourse = await CourseService.updateCourse(id, { name, description, duration });
    if (!updatedCourse) return res.status(404).json({ message: 'Course not found' });
    res.status(200).json(updatedCourse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Delete a course by ID
 */
const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await CourseService.deleteCourse(id);
    if (!deleted) return res.status(404).json({ message: 'Course not found' });
    res.status(200).json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllCourses,
  createCourse,
  getCourseById,
  updateCourse,
  deleteCourse,
};
