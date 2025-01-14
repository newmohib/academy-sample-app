require('dotenv').config({path:'../../.env'})
module.exports = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key', // Replace with an actual secret
    DB_HOST: process.env.DB_HOST ,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD || '',
    DATABASE_NAME: process.env.DATABASE_NAME || '',
    DB_PORT: 5432
  };
  