/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function(knex) {
    return knex.schema.createTable('enrollments', (table) => {
      table.increments('id').primary(); // auto incrementing primary key
      table.integer('student_id').unsigned().notNullable();
      table.integer('course_id').unsigned().notNullable();
      table.string('status').defaultTo('enrolled'); // active, dropped, etc.
      table.timestamps(true, true); // created_at, updated_at timestamps
  
      // Foreign keys
      table.foreign('student_id').references('id').inTable('students').onDelete('CASCADE');
      table.foreign('course_id').references('id').inTable('courses').onDelete('CASCADE');
    });
  };


  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('enrollments');
  };
  
