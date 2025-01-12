// const jwt = require('jsonwebtoken');

// const signup = async (req, res) => {
//   const { username, password } = req.body;
//   // Save user securely (e.g., hash password)
//   const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
//   res.json({ token });
// };

// const signin = async (req, res) => {
//   const { username, password } = req.body;
//   // Validate credentials
//   const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
//   res.json({ token });
// };

// module.exports = { signup, signin };



const { registerUser, loginUser } = require('../services/authService');

// User Signup (Registration)
const signup = async (req, res) => {
  console.log("req.body", req.body);
  
  try {
    const { email, password, role } = req.body; // Expecting email, password, and role (optional)
    
    // Register the user using the authService
    const newUser = await registerUser(email, password, role);
    
    // Generate the JWT token for the newly registered user
    const token = await loginUser(email, password);
    
    // Return the token along with user data (omit sensitive data like password)
    res.status(201).json({ token, user: { id: newUser.id, email: newUser.email, role: newUser.role } });
  } catch (error) {
    console.error('Error during signup:', error.message);
    res.status(400).json({ message: error.message });
  }
};

// User Signin (Login)
const signin = async (req, res) => {
  try {
    const { email, password } = req.body; // Expecting email and password
    
    // Login the user using authService
    const { token, user } = await loginUser(email, password);
    
    // Return the token along with user data (omit sensitive data like password)
    res.status(200).json({ token, user: { id: user.id, email: user.email, role: user.role } });
  } catch (error) {
    console.error('Error during signin:', error.message);
    res.status(401).json({ message: error.message });
  }
};

module.exports = { signup, signin };
