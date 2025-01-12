const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
  const { username, password } = req.body;
  // Save user securely (e.g., hash password)
  const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
};

const signin = async (req, res) => {
  const { username, password } = req.body;
  // Validate credentials
  const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
};

module.exports = { signup, signin };
