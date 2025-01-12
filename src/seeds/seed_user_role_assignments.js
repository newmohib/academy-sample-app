/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = function(knex) {
  return knex('user_role_assignments')
    .del() // Clear existing data
    .then(() => {
      return knex('user_role_assignments').insert([
        { id: 1, user_id: 1, role_id: 1, assigned_at: '2025-01-01' }, // Admin role to user 1
        { id: 2, user_id: 2, role_id: 2, assigned_at: '2025-01-02' }, // Student role to user 2
      ]);
    });
};
