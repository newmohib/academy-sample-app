const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const knex = require('../config/db'); // Assuming knex is configured in a separate file
const config = require('../config/config'); // Your config file to store JWT secret

// Register a new user
const registerUser = async (email, password, role = 'user') => {
  try {
    // Check if user already exists
    const existingUser = await knex('users').where({ email }).first();
    // console.log({ existingUser });
    
    if (existingUser) {
      throw new Error('User already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the user into the database
    const [newUser] = await knex('users').insert({
      email,
      password: hashedPassword,
      role
    }).returning('*');

    console.log({ newUser });

    return newUser;
  } catch (error) {
    console.error('Error registering user:', error);
    throw new Error('Error registering user: ' + error.message);
  }
};

// Login user and generate JWT
const loginUser = async (email, password) => {
    console.log({email,password});
    
  try {
    // Fetch user from database
    const user = await knex('users').where({ email:email }).first();
    // debugger
    console.log("Login User Service",{ user });
    
    if (!user) {
      throw new Error('Invalid User/password');
    }

    // Compare password with stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid User/password');
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      config.JWT_SECRET, // Ensure this secret is set in your config file
      { expiresIn: '1h' } // Token expiration time
    );

    return { token, user };
  } catch (error) {
    throw new Error('Error logging in user: ' + error.message);
  }
};

// Verify JWT token and decode payload
const verifyToken = async (token) => {
    try {
      const decoded = jwt.verify(token, config.JWT_SECRET);
      return decoded; // Returns decoded token payload
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  };
  
  // Get user by id
  const getUserById = async (userId) => {
    try {
      const user = await knex('users').where({ id: userId }).first();
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      throw new Error('Error fetching user: ' + error.message);
    }
  };
  
  // Check if a user has a specific role
  const hasRole = (user, role) => {
    return user.role === role;
  };
  
  module.exports = {
    registerUser,
    loginUser,
    verifyToken,
    getUserById,
    hasRole,
  };
  