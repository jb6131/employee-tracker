const db = require('../config/connection').mysql();

function getAllDepartments(callback) {
  const sql = `SELECT id, name FROM department`;

  db.query(sql, (error, results) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, results);
    }
  });
}

module.exports = {
  getAllDepartments,
};