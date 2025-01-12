const Result = require('../models/resultModel');
const Student = require('../models/studentModel');
const Course = require('../models/courseModel');

class ResultService {
  static async createResult(data) {
    const { student_id, course_id, marks_obtained } = data;

    // Ensure student and course exist
    const student = await Student.query().findById(student_id);
    const course = await Course.query().findById(course_id);

    if (!student) {
      throw new Error(`Student with ID ${student_id} does not exist`);
    }
    if (!course) {
      throw new Error(`Course with ID ${course_id} does not exist`);
    }

    // Create the result
    return await Result.query().insert({
      student_id,
      course_id,
      marks_obtained,
    });
  }

  static async getResultById(resultId) {
    return await Result.query().findById(resultId).withGraphFetched('[student, course]');
  }

  static async getAllResults({ page, limit }) {
    const results = await Result.query()
      .withGraphFetched('[student, course]')
      .page(page - 1, limit);

    return results;
  }

  static async updateResult(resultId, data) {
    return await Result.query().patchAndFetchById(resultId, data);
  }

  static async deleteResult(resultId) {
    return await Result.query().deleteById(resultId);
  }
}

module.exports = ResultService;
