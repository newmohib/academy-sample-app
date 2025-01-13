const { Model } = require('objection');

class Course extends Model {
  static get tableName() {
    return 'courses';
  }

  static get idColumn() {
    return 'id'; // Primary key column
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'description', ],
      properties: {
        id: { type: 'integer' },
            name: { type: 'string', minLength: 1, maxLength: 255 },
            description: { type: 'string', minLength: 1, maxLength: 1000 },
           // duration: { type: 'integer', minimum: 1 }, // Duration in hours
          },
        };
      }
    }
    
    
    
    
module.exports = Course;
    