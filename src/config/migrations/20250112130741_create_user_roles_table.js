/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */


exports.up = function(knex) {
    return knex.schema.createTable('user_roles', (table) => {
      table.increments('id').primary(); // auto incrementing primary key
      table.string('role_name').unique().notNullable(); // Name of the role (e.g., 'admin', 'student')
      table.text('description').nullable(); // Optional description of the role
      table.timestamps(true, true); // created_at, updated_at timestamps
    });
  };

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('user_roles');
  };
  

