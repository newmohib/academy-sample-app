const express = require('express');
const bodyParser = require('body-parser');
const knex = require('./config/db');
const { Model } = require('objection');

const authRoutes = require('./routes/authRoutes');
const instituteRoutes = require('./routes/instituteRoutes');
const studentRoutes = require('./routes/studentRoutes');
const courseRoutes = require('./routes/courseRoutes');
const resultRoutes = require('./routes/resultRoutes');
const reportRoutes = require('./routes/reportRoutes');
const {authenticateJWT, checkRole} = require('./middlewares/authenticateJWT');

const app = express();

// Setup Objection.js
Model.knex(knex);

// Middleware
app.use(bodyParser.json());

// Routes for login and registration and this routes are public
app.use('/auth', authRoutes);

// Middleware to protect routes
// app.use(authenticateJWT);

// Protected routes for only authenticated users with admin role
app.use('/institutes', instituteRoutes);
app.use('/students', studentRoutes);
app.use('/courses', courseRoutes);
// role check for admin access only

// app.use(checkRole('admin'));
app.use('/results', resultRoutes);

// Routes for reports
app.use('/reports', reportRoutes);

module.exports = app;
