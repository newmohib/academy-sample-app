const { Model } = require('objection');
const Student = require('./Student');
const Course = require('./Course');

class Result extends Model {
  static get tableName() {
    return 'results';
  }

  static get idColumn() {
    return 'id';
  }

  static get relationMappings() {
    return {
      student: {
        relation: Model.BelongsToOneRelation,
        modelClass: Student,
        join: {
          from: 'results.student_id',
          to: 'students.id',
        },
      },
      course: {
        relation: Model.BelongsToOneRelation,
        modelClass: Course,
        join: {
          from: 'results.course_id',
          to: 'courses.id',
        },
      },
    };
  }

  static get jsonSchema() {
    return     {
        type: 'object',
        required: ['student_id', 'course_id', 'marks_obtained'],
  
        properties: {
          id: { type: 'integer' },
          student_id: { type: 'integer' },
          course_id: { type: 'integer' },
          marks_obtained: { type: 'number', minimum: 0 },
          created_at: { type: 'string', format: 'date-time' },
          updated_at: { type: 'string', format: 'date-time' },
        },
      };
    }
  }
  
  module.exports = Result;
  