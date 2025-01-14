const bcrypt = require('bcrypt');


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Clears all existing data
  await knex('audit_logs').del();
  await knex('sessions').del();
  await knex('user_role_assignments').del();
  await knex('user_roles').del();
  await knex('users').del();
  await knex('enrollments').del();
  await knex('results').del();
  await knex('courses').del();
  await knex('students').del();
  await knex('institutes').del();

  // Insert seed data for institutes
  await knex('institutes').insert([
    { id: 1, name: 'Institute A', address: '123 Main St', contact: '123-456-7890', email: 'contact@instituteA.com' },
    { id: 2, name: 'Institute B', address: '456 Elm St', contact: '234-567-8901', email: 'contact@instituteB.com' },
    { id: 3, name: 'Institute C', address: '789 Pine St', contact: '345-678-9012', email: 'contact@instituteC.com' },
    { id: 4, name: 'Institute D', address: '101 Oak St', contact: '456-789-0123', email: 'contact@instituteD.com' },
    { id: 5, name: 'Institute E', address: '202 Maple St', contact: '567-890-1234', email: 'contact@instituteE.com' },
  ]);

  // Insert seed data for students
  await knex('students').insert([
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '987-654-3210', dob: '2000-01-01', institute_id: 1 },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '876-543-2109', dob: '1999-02-15', institute_id: 2 },
    { id: 3, name: 'Tom Green', email: 'tom@example.com', phone: '765-432-1098', dob: '1998-03-20', institute_id: 3 },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', phone: '654-321-0987', dob: '1997-04-25', institute_id: 4 },
    { id: 5, name: 'Mark Blue', email: 'mark@example.com', phone: '543-210-9876', dob: '1996-05-30', institute_id: 5 },
  ]);

  // Insert seed data for courses
  await knex('courses').insert([
    { id: 1, name: 'Mathematics 101', description: 'Introduction to Mathematics', institute_id: 1 },
    { id: 2, name: 'Physics 101', description: 'Introduction to Physics', institute_id: 2 },
    { id: 3, name: 'Chemistry 101', description: 'Introduction to Chemistry', institute_id: 3 },
    { id: 4, name: 'Biology 101', description: 'Introduction to Biology', institute_id: 4 },
    { id: 5, name: 'Computer Science 101', description: 'Introduction to Computer Science', institute_id: 5 },
  ]);

  // Insert seed data for results
  await knex('results').insert([
    { id: 1, student_id: 1, course_id: 1, marks_obtained: 85,year:2024 },
    { id: 2, student_id: 2, course_id: 2, marks_obtained: 90,year:2024  },
    { id: 3, student_id: 3, course_id: 3, marks_obtained: 80,year:2025  },
    { id: 4, student_id: 4, course_id: 4, marks_obtained: 88,year:2024  },
    { id: 5, student_id: 5, course_id: 5, marks_obtained: 95,year:2025  },
  ]);

  // Insert seed data for enrollments
  await knex('enrollments').insert([
    { id: 1, student_id: 1, course_id: 1, status: 'enrolled' },
    { id: 2, student_id: 2, course_id: 2, status: 'enrolled' },
    { id: 3, student_id: 3, course_id: 3, status: 'enrolled' },
    { id: 4, student_id: 4, course_id: 4, status: 'enrolled' },
    { id: 5, student_id: 5, course_id: 5, status: 'enrolled' },
  ]);
  const hashedPassword = await bcrypt.hash("12345", 10);
  console.log({ hashedPassword });
  
  // Insert seed data for users
  await knex('users').insert([
    { id: 1, email: 'admin@example.com', password: hashedPassword, role: 'admin' },
    { id: 2, email: 'student1@example.com', password: hashedPassword, role: 'user' },
    { id: 3, email: 'student2@example.com', password: hashedPassword, role: 'user' },
    { id: 4, email: 'teacher@example.com', password: hashedPassword, role: 'user' },
    { id: 5, email: 'support@example.com', password: hashedPassword, role: 'user' },
  ]);

  // Insert seed data for user_roles
  await knex('user_roles').insert([
    { id: 1, role_name: 'admin', description: 'Administrator with full access' },
    { id: 2, role_name: 'user', description: 'Regular user with limited access' },
    { id: 3, role_name: 'teacher', description: 'User with teaching rights' },
  ]);

  // Insert seed data for user_role_assignments
  await knex('user_role_assignments').insert([
    { id: 1, user_id: 1, role_id: 1 },
    { id: 2, user_id: 2, role_id: 2 },
    { id: 3, user_id: 3, role_id: 2 },
    { id: 4, user_id: 4, role_id: 3 },
    { id: 5, user_id: 5, role_id: 2 },
  ]);

  // Insert seed data for sessions
  await knex('sessions').insert([
    { id: 1, session_id: 'sess1', user_id: 1, expires_at: knex.fn.now() },
    { id: 2, session_id: 'sess2', user_id: 2, expires_at: knex.fn.now() },
    { id: 3, session_id: 'sess3', user_id: 3, expires_at: knex.fn.now() },
    { id: 4, session_id: 'sess4', user_id: 4, expires_at: knex.fn.now() },
    { id: 5, session_id: 'sess5', user_id: 5, expires_at: knex.fn.now() },
  ]);

  // Insert seed data for audit_logs
  await knex('audit_logs').insert([
    { id: 1, user_id: 1, action: 'created user', details: 'Created a new admin user.', action_time: knex.fn.now() },
    { id: 2, user_id: 2, action: 'logged in', details: 'User logged in successfully.', action_time: knex.fn.now() },
    { id: 3, user_id: 3, action: 'updated profile', details: 'User updated their profile.', action_time: knex.fn.now() },
    { id: 4, user_id: 4, action: 'logged in', details: 'User logged in successfully.', action_time: knex.fn.now() },
    { id: 5, user_id: 5, action: 'logged out', details: 'User logged out successfully.', action_time: knex.fn.now() },
  ]);
};



// Queries: – Implement queries for retrieving institutes, students, courses, results
// – Implement a query to retrieve results of all students per institute
// – Implement a query to retrieve top courses taken by users per year
// – Implement a query to retrieve top ranking students by highest results. 


// Mutations: – Implement mutations to add institutes, students, courses, results.
// – Implement mutations to update institutes, students, courses, results.
// – Implement mutations to delete institutes, students, courses, results.

