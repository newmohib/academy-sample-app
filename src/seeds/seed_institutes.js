/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = function(knex) {
  return knex('institutes')
    .del()
    .then(() => {
      return knex('institutes').insert([
        { id: 1, name: 'Institute A', location: 'City A', description: 'Top-tier institute' },
        { id: 2, name: 'Institute B', location: 'City B', description: 'High-quality education' },
      ]);
    });
};
