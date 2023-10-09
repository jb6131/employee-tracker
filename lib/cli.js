const inquirer = require('inquirer');
const Table = require('cli-table3');
const departmentModule = require('../modules/departments');
const roleModule = require('../modules/roles');
const employeeModule = require('../modules/employees');

class CLI {
  async run() {
    const userInput = await inquirer
      .prompt([
        {
          type: 'list',
          name: 'choice',
          message: 'What would you like to do?',
          choices: [
            'View All Departments',
            'Add Department',
            'View All Roles',
            'Add Role',
            'View All Employees',
            'Add Employee',
            'Update Employee Role',
            'Quit'
          ]
        }
      ]);

      switch (userInput.choice) {
        case 'View All Departments':
          this.viewAllDepartments();
          break;
        case 'Add Department':
          this.addDepartment();
          break;
        case 'View All Roles':
          this.viewAllRoles();
          break;
        case 'Add Role':
          this.addRole();
          break;
        case 'View All Employees':
          this.viewAllEmployees();
          break;
        case 'Add Employee':
          this.addEmployee();
          break;
        case 'Update Employee Role':
          this.updateEmployeeRole();
          break;
        case 'Quit':
          process.exit();
          break;
      }
  }

  async viewAllDepartments() {
    try {
      const results = await departmentModule.getAllDepartments();

      let table = new Table({
        head: ['ID', 'Name'],
        colWidths: [5, 20]
      });

      results.forEach((department) => {
        table.push([department.id, department.name]);
      });

      console.log(table.toString());
    } catch(err) {
      console.error(err);
    }

    this.run();
  }

  async addDepartment() {
    try {
      const { departmentName } = await inquirer.prompt({
        type: 'input',
        name: 'departmentName',
        message: 'What is the name of the department?'
      });

      await departmentModule.addDepartment(departmentName);

      console.log('Department added successfully!');
    } catch (err) {
      console.error(err);
    }

    this.run();
  }

  async viewAllRoles() {
    try {
      const results = await roleModule.getAllRoles();

      let table = new Table({
        head: ['ID', 'Title', 'Department', 'Salary'],
        colWidths: [5, 20]
      });

      results.forEach((role) => {
        table.push([role.id, role.title, role.department, role.salary]);
      });

      console.log(table.toString());
    } catch(err) {
      console.error(err);
    }

    this.run();
  }

  async addRole() {
    try {
      const departments = await departmentModule.getAllDepartments();

      const questions = [
        {
          type: 'input',
          name: 'roleName',
          message: 'What is the name of the role?',
        },
        {
          type: 'input',
          name: 'salary',
          message: 'What is the salary of the role?',
        },
        {
          type: 'list',
          name: 'departmentID',
          message: 'Which department does the role belong to?',
          choices: departments.map(dept => ({name: dept.name, value: dept.id})),
        }
      ];
      
      const { roleName, salary, departmentID } = await inquirer.prompt(questions);

      await roleModule.addRole(roleName, salary, departmentID);

      console.log('Role added succesfully!');
    } catch(err) {
      console.error(err);
    }

    this.run();
  }

  async viewAllEmployees() {
    try {
      const results = await employeeModule.getAllEmployees();

      let table = new Table({
        head: ['ID', 'First Name', 'Last Name', 'Title', 'Department', 'Salary', 'Manager'],
        colWidths: [5, 20]
      });

      results.forEach((employee) => {
        table.push([employee.id, employee.first_name, employee.last_name, employee.title, employee.department, employee.salary, employee.manager]);
      });

      console.log(table.toString());
    } catch(err) {
      console.error(err);
    }

    this.run();
  }

  async addEmployee() {
    try {
      const roles = await roleModule.getAllRoles();
      const managers = await employeeModule.getAllEmployees();

      const questions = [
        {
          type: 'input',
          name: 'firstName',
          message: `What is the employee's first name?`,
        },
        {
          type: 'input',
          name: 'lastName',
          message: `What is the employee's last name?`,
        },
        {
          type: 'list',
          name: 'roleID',
          message: `What is the employee's role?`,
          choices: roles.map(role => ({name: role.title, value: role.id})),
        },
        {
          type: 'list',
          name: 'managerID',
          message: `Who is the employee's manager?`,
          choices: [...managers.map(manager => ({name: `${manager.first_name} ${manager.last_name}`, value: manager.id})), {name: 'None', value: null}],
        }
      ];

      const { firstName, lastName, roleID, managerID } = await inquirer.prompt(questions);

      await employeeModule.addEmployee(firstName, lastName, roleID, managerID);

      console.log('Employee added successfully!');
    } catch(err) {
      console.error(err);
    }

    this.run();
  }

  async updateEmployeeRole() {
    try {
      const employees = await employeeModule.getAllEmployees();
      const roles = await roleModule.getAllRoles();

      const questions = [
        {
          type: 'list',
          name: 'employeeID',
          message: `Which employee's role do you want to update?`,
          choices: employees.map(employee => ({name: `${employee.first_name} ${employee.last_name}`, value: employee.id})),
        },
        {
          type: 'list',
          name: 'roleID',
          message: `Which role do you want to assign the selected employee?`,
          choices: roles.map(role => ({name: role.title, value: role.id})),
        }
      ];

      const { employeeID, roleID } = await inquirer.prompt(questions);

      await employeeModule.updateEmployeeRole(employeeID, roleID);

      console.log('Employee role updated successfully!');
    } catch(err) {
      console.error(err);
    }

    this.run();
  }
}

module.exports = CLI;