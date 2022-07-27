const mysql = require("mysql2/promise");
const dotenv = require("dotenv");
const env = dotenv.config().parsed;

const connection = async () =>
  await mysql.createConnection({
    host: env.SQL_HOST,
    database: env.SQL_DBNAME,
    port: env.SQL_PORT,
    user: env.SQL_USER,
    password: env.SQL_USER_PASSWORD,
  });

module.exports = connection;
