/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = function(knex) {
  return knex('results')
    .del()
    .then(() => {
      return knex('results').insert([
        { id: 1, student_id: 1, course_id: 1, grade: 'A' },
        { id: 2, student_id: 2, course_id: 2, grade: 'B' },
      ]);
    });
};

