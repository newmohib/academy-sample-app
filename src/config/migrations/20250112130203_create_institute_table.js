/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('institutes', (table) => {
      table.increments('id').primary(); // auto incrementing primary key
      table.string('name').notNullable();
      table.string('address').nullable();
      table.string('contact').nullable();
      table.string('email').unique().nullable();
      table.timestamps(true, true); // created_at, updated_at timestamps
    });
  };
  

  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('institutes');
  };
  
