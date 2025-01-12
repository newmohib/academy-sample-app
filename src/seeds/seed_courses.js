/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = function(knex) {
  return knex('courses')
    .del()
    .then(() => {
      return knex('courses').insert([
        { id: 1, name: 'Course 1', description: 'Basic course', institute_id: 1 },
        { id: 2, name: 'Course 2', description: 'Advanced course', institute_id: 2 },
      ]);
    });
};
