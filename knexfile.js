const dotenv = require('dotenv');
const { resolve } = require('path');

dotenv.config({ path: resolve(__dirname, '.env') });

module.exports = {
  client: 'postgres',
  connection: {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    multipleStatements: true,
  },
  migrations: {
    tableName: 'migration',
  },
};
