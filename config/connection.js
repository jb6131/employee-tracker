const mysql = require('mysql2/promise');

let db = null;

async function getConnection() {
  if (!db) {
    db = await mysql.createConnection({
      host: '127.0.0.1',
      user: 'root',
      password: 'Gunwook66803!',
      database: 'company_db'
    });
  }
  return db;
}

module.exports = {
  mysql: getConnection
};