const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: process.env.MYSQL_HOST || 'localhost',
  port: process.env.MYSQL_PORT || 9229,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSQORD,
  database: process.env.MYSQL_DATABASE,
});

module.exports = connection;