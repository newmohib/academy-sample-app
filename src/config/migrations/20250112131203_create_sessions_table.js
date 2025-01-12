/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function(knex) {
    return knex.schema.createTable('sessions', (table) => {
      table.increments('id').primary(); // auto incrementing primary key
      table.string('session_id').unique().notNullable(); // Unique session identifier
      table.integer('user_id').unsigned().notNullable();
      table.timestamp('expires_at').notNullable(); // Expiration time for the session
      table.timestamps(true, true); // created_at, updated_at timestamps
  
      // Foreign key
      table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE');
    });
  };
  
  
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('sessions');
  };
