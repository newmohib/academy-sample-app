const { Model } = require('objection');

class Institute extends Model {
  static get tableName() {
    return 'institutes';
  }

  static get idColumn() {
    return 'id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'address','contact' ],

      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 1, maxLength: 255 },
        address: { type: 'string', minLength: 1, maxLength: 500 },
        contact: { type: 'string', minLength: 1, maxLength: 15 },
      },
    };
  }
}

module.exports = Institute;
