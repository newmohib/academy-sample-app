const Knex = require('knex');
const knexConfig = require('./knexfile');
const environment = process.env.NODE_ENV || 'development';

const knex = Knex(knexConfig[environment]);
module.exports = knex;


// const knex = require('knex');
// const knexfile = require('./knexfile');
// const {Model} = require('objection');

// function setupDb() {
//     const db = knex(knexfile.development)
//     Model.knex(db)
// }

// module.exports = setupDb
