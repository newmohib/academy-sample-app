const { validationResult } = require('express-validator');
const StudentService = require('../services/studentService');

const Student = require('../models/Student');

// Get paginated students
exports.getPaginatedStudents = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query; // Default to page 1, limit 10
    const offset = (page - 1) * limit;

    const [students, total] = await Promise.all([
      Student.query().offset(offset).limit(parseInt(limit)),
      Student.query().resultSize(), // Gets total count of students
    ]);

    res.status(200).json({
      data: students,
      meta: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalRecords: total,
      },
    });
  } catch (error) {
    console.error('Error fetching paginated students:', error);
    res.status(500).json({ message: 'Error fetching students', error });
  }
};

// Other controller functions remain unchanged


class StudentController {
  static async createStudent(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const student = await StudentService.createStudent(req.body);
      res.status(201).json(student);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  static async getStudents(req, res) {
    const { page = 1, pageSize = 10 } = req.query;

    try {
      const students = await StudentService.getStudents(parseInt(page), parseInt(pageSize));
      res.json(students);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  static async updateStudent(req, res) {
    const { id } = req.params;

    try {
      const updatedStudent = await StudentService.updateStudent(id, req.body);
      res.json(updatedStudent);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  static async deleteStudent(req, res) {
    const { id } = req.params;

    try {
      await StudentService.deleteStudent(id);
      res.status(204).send();
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}

module.exports = StudentController;
