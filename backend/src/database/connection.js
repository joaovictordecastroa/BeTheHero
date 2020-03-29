const knex = require('knex');
const configuration = require('../../knexfile');


if (process.env.NODE_ENV == 'test') {
    module.exports =  knex(configuration.test);
} else {
    module.exports = knex(configuration.development)
}


