/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('students', (table) => {
      table.increments('id').primary(); // auto incrementing primary key
      table.string('name').notNullable();
      table.string('email').unique().notNullable();
      table.string('phone').notNullable();
      table.date('dob').notNullable(); // Date of birth
      table
        .integer('institute_id') // Foreign key column
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('institutes')
        .onDelete('CASCADE'); // Ensures students are deleted if their institute is deleted
      table.timestamps(true, true); // created_at, updated_at timestamps
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('students');
  };
  