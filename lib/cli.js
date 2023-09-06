const inquirer = require('inquirer');

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
  }
}

module.exports = CLI;