#!/usr/bin/env node
const cli = require('commander');

// const organizations = require('./cli/organizations');
const users = require('./cli/users');
// const seo = require('./cli/seo');

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

// cli
//   .command('refreshRealizations')
//   .description('Fetch realizations from sources and update database')
//   .argument(
//     '[path]',
//     'Path of the organization, if not defined, update all organizations'
//   )
//   .action(organizations.refreshRealizations);

// cli
//   .command('createOrganization')
//   .description('Create organization from json input')
//   .action(organizations.create);

// cli
//   .command('getOrganization')
//   .description('Get organization by path as json output')
//   .argument('<path>', 'Path of the organization')
//   .action(organizations.get);

// cli
//   .command('updateOrganization')
//   .description('Update organization from json input')
//   .argument('<path>', 'Path of the organization')
//   .action(organizations.update);

// cli
//   .command('createRealizationType')
//   .description('Create RealizationType from json input')
//   .argument('<path>', 'Path of the organization')
//   .action(organizations.createRealizationType);

// cli
//   .command('createRealizationSource')
//   .description('Create RealizationSource from json input')
//   .argument('<path>', 'Path of the organization')
//   .action(organizations.createRealizationSource);

// cli
//   .command('updateSeo')
//   .description('Update search engine optimization files')
//   .action(seo.updateSeo);

cli.parse(process.argv);
