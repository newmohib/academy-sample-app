/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('courses', (table) => {
        table.increments('id').primary(); // Auto-incrementing primary key
        table.string('name').notNullable(); // Course name
        table.text('description'); // Optional course description
        table.integer('institute_id').unsigned().notNullable(); // Foreign key to institutes
        table.foreign('institute_id').references('institutes.id').onDelete('CASCADE'); // Cascade delete
        table.timestamps(true, true); // Adds created_at and updated_at columns
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('courses');
};
