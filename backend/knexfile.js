module.exports = {
    development: {
        client: 'sqlite3',
        connection: {
            filename: './data/db.sqlite3'
        },
        useNullAsDefault: true,
        migrations: {
            directory: './migrations'
        }
    }
};

/* MySQL
module.exports = {
    development: {
      client: 'mysql2',
      connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'test'
      },
      migrations: {
        directory: './migrations'
      },
      seeds: {
        directory: './seeds'
      }
    }
  };
*/