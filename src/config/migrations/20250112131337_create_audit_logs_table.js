/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function(knex) {
    return knex.schema.createTable('audit_logs', (table) => {
      table.increments('id').primary(); // auto incrementing primary key
      table.integer('user_id').unsigned().notNullable();
      table.string('action').notNullable(); // Action performed by the user
      table.text('details').nullable(); // Optional detailed information about the action
      table.timestamp('action_time').defaultTo(knex.fn.now()); // Time when the action occurred
      table.timestamps(true, true); // created_at, updated_at timestamps
  
      // Foreign key
      table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('audit_logs');
  };
  

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

