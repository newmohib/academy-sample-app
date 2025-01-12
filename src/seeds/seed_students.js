/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = function(knex) {
  return knex('students')
    .del()
    .then(() => {
      return knex('students').insert([
        { id: 1, name: 'Student 1', email: 'student1@school.com', institute_id: 1 },
        { id: 2, name: 'Student 2', email: 'student2@school.com', institute_id: 2 },
      ]);
    });
};

