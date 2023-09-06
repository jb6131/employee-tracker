const inquirer = require('inquirer');
const departmentModel = require('../modules/viewDepartment');

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
            'Update Employee Role'
          ]
        }
      ]);

      switch (userInput.choice) {
        case 'View All Departments':
          this.viewAllDepartments();
          break;
      }
  }

  async viewAllDepartments() {
    departmentModel.getAllDepartments((error, results) => {
      if (error) {
        console.error('Error:', error);
      } else {
        console.log('Departments:');
        results.forEach((department) => {
          console.log(`ID: ${department.id}, Name: ${department.name}`);
        });
      }
    });
  }
}

module.exports = CLI;