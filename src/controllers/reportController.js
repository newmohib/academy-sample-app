const { transaction } = require('objection');
const Institute = require('../models/Institute');
const Student = require('../models/Student');
const Course = require('../models/Course');
const Result = require('../models/Result');

// Controller Functions
module.exports = {
  // 1. Retrieve all institutes
  getInstitutes: async (req, res) => {
    try {
      const institutes = await Institute.query();
      res.status(200).json({ data: institutes });
    } catch (error) {
      console.error('Error fetching institutes:', error);
      res.status(500).json({ message: 'Error fetching institutes', error });
    }
  },

  // 2. Retrieve all students
  getStudents: async (req, res) => {
    try {
      const students = await Student.query();
      res.status(200).json({ data: students });
    } catch (error) {
      console.error('Error fetching students:', error);
      res.status(500).json({ message: 'Error fetching students', error });
    }
  },

  // 3. Retrieve all courses
  getCourses: async (req, res) => {
    try {
      const courses = await Course.query();
      res.status(200).json({ data: courses });
    } catch (error) {
      console.error('Error fetching courses:', error);
      res.status(500).json({ message: 'Error fetching courses', error });
    }
  },

    // 4. Retrieve all results
    getResults: async (req, res) => {
        try {
          const results = await Result.query()
            .select('results.*', 'students.name as student_name', 'courses.name as course_name')
            .join('students', 'results.student_id', 'students.id')
            .join('courses', 'results.course_id', 'courses.id');
          res.status(200).json({ data: results });
        } catch (error) {
          console.error('Error fetching results:', error);
          res.status(500).json({ message: 'Error fetching results', error });
        }
      },
    
      // 5. Retrieve results of all students per institute
      getResultsByInstitute: async (req, res) => {
        try {
          const { instituteId } = req.params;
          const results = await Result.query()
            .select(
              'results.*',
              'students.name as student_name',
              'courses.name as course_name',
              'institutes.name as institute_name'
            )
            .join('students', 'results.student_id', 'students.id')
            .join('courses', 'results.course_id', 'courses.id')
            .join('institutes', 'students.institute_id', 'institutes.id')
            .where('students.institute_id', instituteId);
          res.status(200).json({ data: results });
        } catch (error) {
          console.error('Error fetching results by institute:', error);
          res.status(500).json({ message: 'Error fetching results by institute', error });
        }
      },
    
      // 6. Retrieve top courses taken by users per year
      getTopCoursesByYear: async (req, res) => {
        try {
          const { year } = req.query;
      
          if (!year) {
            return res.status(400).json({ message: 'Year is required' });
          }
      
          const topCourses = await Result.query()
            .select('courses.name as course_name')
            .count('results.id as students_enrolled')
            .join('courses', 'results.course_id', 'courses.id')
            .where('results.year', year)
            .groupBy('courses.name')
            .orderBy('students_enrolled', 'desc');
      
          res.status(200).json({ data: topCourses });
        } catch (error) {
          console.error('Error fetching top courses:', error);
          res.status(500).json({ message: 'Error fetching top courses', error });
        }
      },
      
    //   getTopCoursesByYear: async (req, res) => {
    //     try {
    //       const { year } = req.query; // Pass the year as a query parameter
    //       const topCourses = await Result.query()
    //         .select('courses.name as course_name')
    //         .count('results.id as students_enrolled')
    //         .join('courses', 'results.course_id', 'courses.id')
    //         .whereRaw('EXTRACT(YEAR FROM results.created_at) = ?', [year])
    //         .groupBy('courses.name')
    //         .orderBy('students_enrolled', 'desc');
    //       res.status(200).json({ data: topCourses });
    //     } catch (error) {
    //       console.error('Error fetching top courses:', error);
    //       res.status(500).json({ message: 'Error fetching top courses', error });
    //     }
    //   },
    
      // 7. Retrieve top-ranking students by highest results
      getTopStudents: async (req, res) => {
        try {
          const topStudents = await Result.query()
            .select(
              'students.name as student_name',
              'students.id as student_id',
              'courses.name as course_name',
              'results.marks_obtained'
            )
            .join('students', 'results.student_id', 'students.id')
            .join('courses', 'results.course_id', 'courses.id')
            .orderBy('results.marks_obtained', 'desc')
            .limit(10); // Retrieve top 10 students
          res.status(200).json({ data: topStudents });
        } catch (error) {
          console.error('Error fetching top students:', error);
          res.status(500).json({ message: 'Error fetching top students', error });
        }
      },
    };
    
    // module.exports = reportController    