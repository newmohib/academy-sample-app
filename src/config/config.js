require('dotenv').config({path:'../../.env'})

module.exports = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key', // Replace with an actual secret
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_USER: process.env.DB_USER || 'postgres',
    DB_PASSWORD: process.env.DB_PASSWORD || 'postgres',
    DATABASE_NAME: process.env.DATABASE_NAME || 'gain_solutions_project_3',
    DB_PORT: 5432
  };
  