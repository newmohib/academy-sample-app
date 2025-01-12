const Student = require('../models/Student');

class StudentService {
  static async createStudent(data) {
    return await Student.query().insert(data);
  }

  static async getStudents(page, pageSize) {
    return await Student.query().page(page - 1, pageSize);
  }

  static async updateStudent(id, data) {
    return await Student.query().findById(id).patch(data);
  }

  static async deleteStudent(id) {
    return await Student.query().findById(id).delete();
  }

  static async getStudentById(id) {
    return await Student.query().findById(id);
  }
}

module.exports = StudentService;
