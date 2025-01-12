const { Model } = require('objection');

class Student extends Model {
  static get tableName() {
    return 'students';
  }

  static get idColumn() {
    return 'id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'age', 'institute_id'],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 1, maxLength: 255 },
        age: { type: 'integer', minimum: 18, maximum: 100 },
        institute_id: { type: 'integer' },
      },
    };
  }
}

module.exports = Student;
