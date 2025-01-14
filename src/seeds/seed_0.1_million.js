const bcrypt = require('bcrypt');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  console.log("Clearing existing data...");
  
  // Clears all existing data in reverse dependency order
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

  console.log("Inserting data for institutes...");
  
  // Insert seed data for institutes
  const instituteCount = 100;
  const institutes = [];
  for (let i = 1; i <= instituteCount; i++) {
    institutes.push({
      id: i,
      name: `Institute ${i}`,
      address: `${i} Main St`,
      contact: `123-456-${i.toString().padStart(4, '0')}`,
      email: `contact@institute${i}.com`,
    });
  }
  await knex('institutes').insert(institutes);

  console.log("Inserting data for students...");
  
  // Insert seed data for students
  const studentCount = 100000;
  const students = [];
  for (let i = 1; i <= studentCount; i++) {
    students.push({
      id: i,
      name: `Student ${i}`,
      email: `student${i}@example.com`,
      phone: `987-654-${i.toString().padStart(4, '0')}`,
      dob: `200${i % 10}-01-01`,
      institute_id: (i % instituteCount) + 1, // Randomize institute assignment
    });
  }
  await knex.batchInsert('students', students, 5000); // Insert in batches

  console.log("Inserting data for courses...");
  
  // Insert seed data for courses
  const courseCount = 500;
  const courses = [];
  for (let i = 1; i <= courseCount; i++) {
    courses.push({
      id: i,
      name: `Course ${i}`,
      description: `Description of Course ${i}`,
      institute_id: (i % instituteCount) + 1, // Randomize institute assignment
    });
  }
  await knex('courses').insert(courses);

  console.log("Inserting data for results...");
  
  // Insert seed data for results
  const results = [];
  for (let i = 1; i <= studentCount; i++) {
    results.push({
      id: i,
      student_id: i,
      course_id: (i % courseCount) + 1, // Randomize course assignment
      marks_obtained: Math.floor(Math.random() * 101), // Random marks between 0-100
      year: 2020 + (i % 5), // Randomize years
    });
  }
  await knex.batchInsert('results', results, 5000);

  console.log("Inserting data for enrollments...");
  
  // Insert seed data for enrollments
  const enrollments = [];
  for (let i = 1; i <= studentCount; i++) {
    enrollments.push({
      id: i,
      student_id: i,
      course_id: (i % courseCount) + 1, // Match with results for consistency
      status: 'enrolled',
    });
  }
  await knex.batchInsert('enrollments', enrollments, 5000);

  console.log("Inserting data for users...");
  
  // Insert seed data for users
  const hashedPassword = await bcrypt.hash("12345", 10);
  const users = [];
  for (let i = 1; i <= studentCount; i++) {
    users.push({
      id: i,
      email: `user${i}@example.com`,
      password: hashedPassword,
      role: i % 2 === 0 ? 'user' : 'admin', // Alternate roles
    });
  }
  await knex.batchInsert('users', users, 5000);

  console.log("Inserting data for audit logs...");
  
  // Insert seed data for audit logs
  const auditLogs = [];
  for (let i = 1; i <= studentCount; i++) {
    auditLogs.push({
      id: i,
      user_id: i,
      action: 'logged in',
      details: `User ${i} logged in successfully.`,
      action_time: knex.fn.now(),
    });
  }
  await knex.batchInsert('audit_logs', auditLogs, 5000);

  console.log("Data seeding completed!");
};
