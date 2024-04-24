// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

    // MySQL connection configuration
  development: {
    client: 'mysql2',
    connection: {
      host: 'localhost',
      user: 'root',
      password: 'password',
      database: 'migra_from_mysql_to_mongodb',
    }
  }

};
