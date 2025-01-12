/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('courses', (table) => {
      table.increments('id').primary(); // auto incrementing primary key
      table.string('course_name').notNullable();
      table.string('course_code').unique().notNullable();
      table.integer('credits').notNullable();
      table.text('description').nullable();
      table.timestamps(true, true); // created_at, updated_at timestamps
    });
  };
  
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('courses');
  };
  

