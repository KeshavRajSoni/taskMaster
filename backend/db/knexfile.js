const { knexSnakeCaseMappers } = require('objection');

module.exports = {



  development: {
    client: 'mysql2',
    connection: {
      database: 'taskmanagmentapp',
      user: 'root',
      password: 'root'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },
  ...knexSnakeCaseMappers,


};
