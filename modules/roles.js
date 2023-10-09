const getConnection = require('../config/connection').mysql;

async function getAllRoles() {
  const db = await getConnection();
  const sql = `SELECT
                role.id,
                role.title,
                department.name AS department,
                role.salary
              FROM
                role
              LEFT JOIN
                department ON role.department_id = department.id`;
  const [results] = await db.query(sql);
  return results;
}

async function addRole(roleName, salary, departmentID) {
  const db = await getConnection();
  const sql = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';
  const [results] = await db.query(sql, [roleName, salary, departmentID]);
  return results;
}

module.exports = {
  getAllRoles,
  addRole
};