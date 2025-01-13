/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function (knex) {
    return knex.schema.alterTable('results', (table) => {
      // Add a new column for year
      table.integer('year').unsigned().notNullable().defaultTo(new Date().getFullYear());
    });
  };

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
  exports.down = function (knex) {
    return knex.schema.alterTable('results', (table) => {
      table.dropColumn('year');
    });
  };
  