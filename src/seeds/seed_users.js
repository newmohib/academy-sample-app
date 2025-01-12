/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = function(knex) {
  return knex('users')
    .del()
    .then(() => {
      return knex('users').insert([
        { id: 1, email: 'admin@example.com', password: 'hashedpassword1', role: 'admin' },
        { id: 2, email: 'student1@example.com', password: 'hashedpassword2', role: 'student' },
      ]);
    });
};

