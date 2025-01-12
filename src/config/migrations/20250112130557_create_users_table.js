/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function(knex) {
    return knex.schema.createTable('users', (table) => {
      table.increments('id').primary(); // auto incrementing primary key
      table.string('email').unique().notNullable(); // email must be unique
      table.string('password').notNullable(); // hashed password field
      table.string('role').defaultTo('user'); // roles could be 'user', 'admin', etc.
      table.timestamps(true, true); // created_at, updated_at timestamps
    });
  };
  
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users');
  };
  