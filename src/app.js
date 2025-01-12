const express = require('express');
const bodyParser = require('body-parser');
const knex = require('./config/db');
const { Model } = require('objection');

const authRoutes = require('./routes/authRoutes');
const instituteRoutes = require('./routes/instituteRoutes');
const studentRoutes = require('./routes/studentRoutes');
const courseRoutes = require('./routes/courseRoutes');
const resultRoutes = require('./routes/resultRoutes');

const app = express();

// Setup Objection.js
Model.knex(knex);

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/auth', authRoutes);
app.use('/institutes', instituteRoutes);
app.use('/students', studentRoutes);
app.use('/courses', courseRoutes);
app.use('/results', resultRoutes);

module.exports = app;
