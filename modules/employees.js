const getConnection = require('../config/connection').mysql;

async function getAllEmployees() {
  const db = await getConnection();
  const sql = `SELECT
                employee.id,
                employee.first_name,
                employee.last_name,
                role.title AS title,
                department.name AS department,
                role.salary AS salary,
                CONCAT(manager.first_name, ' ', manager.last_name) AS manager
              FROM
                employee
              LEFT JOIN
                role ON employee.role_id = role.id
              LEFT JOIN
                department ON role.department_id = department.id
              LEFT JOIN
                employee manager ON employee.manager_id = manager.id`;
  const [results] = await db.query(sql);
  return results;
}

async function addEmployee(firstName, lastName, roleID, managerID) {
  const db = await getConnection();
  const sql = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
  const [results] = await db.query(sql, [firstName, lastName, roleID, managerID]);
  return results;
}

async function updateEmployeeRole(employeeID, roleID) {
  const db = await getConnection();
  const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
  await db.query(sql, [roleID, employeeID]);
}

module.exports = {
  getAllEmployees,
  addEmployee,
  updateEmployeeRole
};