/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function(knex) {
    return knex.schema.createTable('user_role_assignments', (table) => {
      table.increments('id').primary(); // auto incrementing primary key
      table.integer('user_id').unsigned().notNullable();
      table.integer('role_id').unsigned().notNullable();
      table.timestamps(true, true); // created_at, updated_at timestamps
  
      // Foreign keys
      table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE');
      table.foreign('role_id').references('id').inTable('user_roles').onDelete('CASCADE');
    });
  };
  
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('user_role_assignments');
  };
