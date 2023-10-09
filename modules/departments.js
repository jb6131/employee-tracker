const getConnection = require('../config/connection').mysql;

async function getAllDepartments() {
  const db = await getConnection();
  const sql = `SELECT department.id, department.name FROM department`;
  const [results] = await db.query(sql);
  return results;
}

async function addDepartment(departmentName) {
  const db = await getConnection();
  const sql = 'INSERT INTO department (name) VALUES (?)';
  const [results] = await db.query(sql, [departmentName]);
  return results;
}

module.exports = {
  getAllDepartments,
  addDepartment
};