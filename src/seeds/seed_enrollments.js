/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = function(knex) {
  return knex('enrollments')
    .del() // Clear existing data
    .then(() => {
      return knex('enrollments').insert([
        { id: 1, student_id: 1, course_id: 1, enrollment_date: '2025-01-01', status: 'active' },
        { id: 2, student_id: 2, course_id: 2, enrollment_date: '2025-01-02', status: 'active' },
        { id: 3, student_id: 1, course_id: 2, enrollment_date: '2025-01-03', status: 'completed' },
      ]);
    });
};
