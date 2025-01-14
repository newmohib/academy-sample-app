// require('dotenv').config();

// module.exports = {
//   development: {
//     client: 'mysql2', // Change to 'pg' for PostgreSQL or 'sqlite3' for SQLite
//     connection: {
//       host: process.env.DB_HOST || '127.0.0.1',
//       user: process.env.DB_USER || 'root',
//       password: process.env.DB_PASSWORD || '',
//       database: process.env.DB_NAME || 'my_database',
//     },
//     pool: {
//       min: 2,
//       max: 10,
//     },
//     migrations: {
//       tableName: 'knex_migrations',
//       directory: './migrations',
//     },
//     seeds: {
//       directory: './seeds',
//     },
//   },

//   staging: {
//     client: 'mysql2',
//     connection: {
//       host: process.env.DB_HOST_STAGING || '127.0.0.1',
//       user: process.env.DB_USER_STAGING || 'root',
//       password: process.env.DB_PASSWORD_STAGING || '',
//       database: process.env.DB_NAME_STAGING || 'my_database_staging',
//     },
//     pool: {
//       min: 2,
//       max: 10,
//     },
//     migrations: {
//       tableName: 'knex_migrations',
//       directory: './migrations',
//     },
//     seeds: {
//       directory: './seeds',
//     },
//   },

//   production: {
//     client: 'mysql2',
//     connection: {
//       host: process.env.DB_HOST_PRODUCTION || '127.0.0.1',
//       user: process.env.DB_USER_PRODUCTION || 'root',
//       password: process.env.DB_PASSWORD_PRODUCTION || '',
//       database: process.env.DB_NAME_PRODUCTION || 'my_database_production',
//     },
//     pool: {
//       min: 2,
//       max: 10,
//     },
//     migrations: {
//       tableName: 'knex_migrations',
//       directory: './migrations',
//     },
//     seeds: {
//       directory: './seeds',
//     },
//   },
// };


// Update with your config settings.
const { knexSnakeCaseMappers } = require("objection");
const config = require("./config");

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: "postgresql",
    connection: {
      database: config.DATABASE_NAME,
      user: config.DB_USER,
      password: config.DB_PASSWORD,
      host: config.DB_HOST,
      port: config.DB_PORT,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
      directory: './migrations',
    },
    seeds: {
      directory: "../seeds",
    },
    ...knexSnakeCaseMappers,
  },
};
