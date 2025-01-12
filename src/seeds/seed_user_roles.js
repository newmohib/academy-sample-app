/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = function(knex) {
  return knex('user_roles')
    .del() // Clear existing data
    .then(() => {
      // Insert seed data
      return knex('user_roles').insert([
        { id: 1, role_name: 'admin', description: 'Administrator with full access' },
        { id: 2, role_name: 'student', description: 'Student with limited access' },
      ]);
    });
};
