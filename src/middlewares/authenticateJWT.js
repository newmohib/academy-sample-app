const jwt = require('jsonwebtoken');
const { verifyToken, hasRole } = require('../services/authService');


const authenticateJWT = async (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).send('Access Denied');
  try {
    const payload = await verifyToken(token);
    if (!payload) return res.status(401).send('Access Denied');
    req.user = payload;
    next(); 
  } catch (error) {
    console.error('Error verifying token:', error);
    res.status(403).send('Invalid Token');
  }
};

// check role
const checkRole = (role) => {
  return (req, res, next) => {
    if (!hasRole(req.user, role)) {
      return res.status(403).send('Access Denied');
    }
    next();
  };
};


module.exports = {authenticateJWT};
