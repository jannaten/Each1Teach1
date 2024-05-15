const inquirer = require('inquirer');
const fs = require('fs');
const UserService = require('../src/services/UserService');
const AuthService = require('../src/services/AuthService');

const userService = new UserService();

const createSuperUser = async () => {
  try {
    const questions = [
      {
        name: 'firstName',
        type: 'input',
        message: 'Firstname:',
        validate: (value) => {
          if (value.length) return true;
          return 'Firstname is required.';
        }
      },
      {
        name: 'lastName',
        type: 'input',
        message: 'Lastname:',
        validate: (value) => {
          if (value.length) return true;
          return 'Lastname is required.';
        }
      },
      {
        name: 'email',
        type: 'input',
        message: 'Email:',
        validate: (value) => {
          if (value.length) return true;
          return 'Email is required.';
        }
      },
      {
        name: 'password',
        type: 'password',
        message: 'Password:',
        validate: (value) => {
          if (value.length) return true;
          return 'Password is required.';
        }
      }
    ];

    const user = await inquirer.prompt(questions);
    user.password = AuthService.createPasswordHash(user.password);
    user.roles = ['superuser'];
    await userService.create(user);
    console.log('Superuser created.');
  } catch (error) {
    console.error(error);
  } finally {
    process.exit();
  }
};

const changePassword = async (email) => {
  try {
    const user = await userService.getByEmail(email);
    if (!user) {
      throw new Error('User not found.');
    }

    let newPassword = '';

    const questions = [
      {
        name: 'password',
        type: 'password',
        message: 'Password:',
        validate: (value) => {
          if (value.length) {
            newPassword = value;
            return true;
          }
          return 'Password is required.';
        }
      },
      {
        name: 'confirmPassword',
        type: 'password',
        message: 'Password again:',
        validate: (value) => {
          if (value === newPassword) {
            return true;
          }
          return 'Passwords did not match.';
        }
      }
    ];

    const { password } = await inquirer.prompt(questions);
    await userService.update(user.id, {
      password: AuthService.createPasswordHash(password)
    });
    console.log('Password changed.');
  } catch (error) {
    console.error(error);
  } finally {
    process.exit();
  }
};

const create = async () => {
  try {
    let data = JSON.parse(fs.readFileSync(0).toString());
    let result;

    const createUser = async (user) => {
      user.password = AuthService.createPasswordHash(user.password);
      user = await userService.create(user);
      return user.toJSON();
    };

    if (Array.isArray(data)) {
      result = await Promise.all(
        data.map(
          (user) =>
            new Promise((resolve) => {
              createUser(user).then((data) => resolve(data));
            })
        )
      );
    } else {
      result = await createUser(data);
    }

    console.log(JSON.stringify(result, null, 2));
  } catch (error) {
    console.error(error);
  } finally {
    process.exit();
  }
};

module.exports = {
  createSuperUser,
  create,
  changePassword
};
