const mysql = require('mysql2/promise');
require('dotenv').config();

const connection = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  // port: process.env.PORT,
  port: 3306,
  database: process.env.MYSQL_DATABASE || 'StoreManager',
  // waitForConnections: true,
  // connectionLimit: 10,
  // queueLimit: 0,
});

module.exports = connection;