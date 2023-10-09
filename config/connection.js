const mysql = require('mysql2/promise');

let db = null;

async function getConnection() {
  if (!db) {
    db = await mysql.createConnection({
      host: '127.0.0.1',
      user: '',
      password: '',
      database: 'company_db'
    });
  }
  return db;
}

module.exports = {
  mysql: getConnection
};