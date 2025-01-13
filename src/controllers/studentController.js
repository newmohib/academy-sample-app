const { validationResult } = require('express-validator');
const StudentService = require('../services/studentService');

const Student = require('../models/Student');

// Get paginated students
// exports.getPaginatedStudents = async (req, res) => {
//   try {
//     const { page = 1, limit = 10 } = req.query; // Default to page 1, limit 10
//     const offset = (page - 1) * limit;

//     const [students, total] = await Promise.all([
//       Student.query().offset(offset).limit(parseInt(limit)),
//       Student.query().resultSize(), // Gets total count of students
//     ]);

//     res.status(200).json({
//       data: students,
//       meta: {
//         currentPage: parseInt(page),
//         totalPages: Math.ceil(total / limit),
//         totalRecords: total,
//       },
//     });
//   } catch (error) {
//     console.error('Error fetching paginated students:', error);
//     res.status(500).json({ message: 'Error fetching students', error });
//   }
// };

// Other controller functions remain unchanged


class StudentController {
  static async getPaginatedStudents (req, res) {
    // try {
    //   const { page = 1, limit = 10 } = req.query; // Default to page 1, limit 10
    //   const offset = (page - 1) * limit;
  
    //   const [students, total] = await Promise.all([
    //     Student.query().offset(offset).limit(parseInt(limit)),
    //     Student.query().resultSize(), // Gets total count of students
    //   ]);
  
    //   res.status(200).json({
    //     data: students,
    //     meta: {
    //       currentPage: parseInt(page),
    //       totalPages: Math.ceil(total / limit),
    //       totalRecords: total,
    //     },
    //   });
    // } catch (error) {
    //   console.error('Error fetching paginated students:', error);
    //   res.status(500).json({ message: 'Error fetching students', error });
    // }


    // Fetch paginated students


    // try {
    //   const { limit = 10, cursor, direction } = req.query; // Default limit to 10
    
    //   const query = Student.query().orderBy('id', direction === 'prev' ? 'desc' : 'asc').limit(parseInt(limit));
    
    //   // Add cursor condition
    //   if (cursor) {
    //     if (direction === 'prev') {
    //       query.where('id', '<', cursor); // Fetch previous records
    //     } else {
    //       query.where('id', '>', cursor); // Fetch next records
    //     }
    //   }
    
    //   const students = await query;
    
    //   // Adjust next and previous cursors based on the current query
    //   const nextCursor = students.length > 0 ? students[students.length - 1].id : null;
    //   const prevCursor = students.length > 0 ? students[0].id : null;
    
    //   res.status(200).json({
    //     data: students,
    //     meta: {
    //       nextCursor, // Send the next cursor for next page
    //       prevCursor, // Send the previous cursor for previous page (optional)
    //       hasNextPage: students.length === parseInt(limit),
    //       hasPrevPage: !!cursor, // If a cursor exists, a previous page might exist
    //     },
    //   });
    // } catch (error) {
    //   console.error('Error fetching paginated students:', error);
    //   res.status(500).json({ message: 'Error fetching students', error });
    // }

    // Fetch paginated students with cursor

    try {
      const { limit = 10, cursor, direction = 'next' } = req.query;
  
      // Parse limit and set defaults
      const parsedLimit = Math.max(parseInt(limit, 10), 1); // Ensure limit is a positive integer
      const cursorCondition = cursor ? Buffer.from(cursor, 'base64').toString('ascii') : null;
  
      // Base query
      let query = Student.query().orderBy('id', direction === 'next' ? 'asc' : 'desc').limit(parsedLimit + 1);
  
      // Cursor logic for next or previous page
      if (cursorCondition) {
        query = query.where('id', direction === 'next' ? '>' : '<', cursorCondition);
      }
  
      // Fetch results
      const results = await query;
      const hasMore = results.length > parsedLimit; // Check if there's an extra record
      if (hasMore) results.pop(); // Remove the extra record
  
      // Generate next and previous cursors
      const nextCursor = hasMore ? Buffer.from(String(results[results.length - 1].id)).toString('base64') : null;
      const prevCursor =
        results.length > 0 ? Buffer.from(String(results[0].id)).toString('base64') : cursorCondition;
  
      // Response with data and meta
      res.status(200).json({
        data: results,
        meta: {
          nextCursor: nextCursor,
          prevCursor: prevCursor,
          limit: parsedLimit,
          direction,
        },
      });
    } catch (error) {
      console.error('Error fetching paginated students:', error);
      res.status(500).json({ message: 'Error fetching students', error });
    }
    
  }
  static async getStudentById(req, res) {
    try {
      const student = await StudentService.getStudentById(req.params.id);
      res.json(student);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
  static async createStudent(req, res) {
    console.log("Create Student 1");
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const student = await StudentService.createStudent(req.body);
      console.log("Create Student 2");
      res.status(201).json(student);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  static async getStudents(req, res) {
    const { page = 1, pageSize = 10 } = req.query;

    try {
      const students = await StudentService.getStudents(parseInt(page), parseInt(pageSize));
      res.json(students);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  static async updateStudent(req, res) {
    const { id } = req.params;

    try {
      const updatedStudent = await StudentService.updateStudent(id, req.body);
      res.json(updatedStudent);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  static async deleteStudent(req, res) {
    const { id } = req.params;

    try {
      await StudentService.deleteStudent(id);
      res.status(204).send();
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}

module.exports = StudentController;
