#!/usr/bin/env node
const cli = require('commander');

const users = require('./cli/users');

cli.description('Each1Teach1 CLI');
cli.name('manage.js');
cli.usage('<command>');
cli.addHelpCommand(true);
cli.helpOption(true);

cli
  .command('createSuperuser')
  .description('Create user with superuser role.')
  .action(users.createSuperUser);

cli
  .command('changePassword')
  .description('Change password.')
  .argument('<email>', 'Email of the user')
  .action(users.changePassword);

cli
  .command('createUsers')
  .description('Create user(s) from json input')
  .action(users.create);

cli.parse(process.argv);
