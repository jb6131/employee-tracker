const mysql = require('mysql2');

let db = null;

module.exports = {
  mysql: () => {
    if (!db) {
      db = mysql.createConnection(
        {
          host: '127.0.0.1',
          user: 'root',
          password: 'Gunwook66803!',
          database: 'company_db'
        },
        console.log('Connected to the company_db database.')
      );
    }
    return db;
  }
};