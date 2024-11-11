const ConfigService = require('../src/services/ConfigService');

/**
 * Make any changes you need to make to the database here
 */
async function up() {
  // Write migration here
  const configService = new ConfigService();
  await configService.create({});
  console.log('Migration down: Configuration is created');
}

/**
 * Make any changes that UNDO the up function side effects here (if possible)
 */
async function down() {
  // Write migration here
  const Model = await ConfigService.getModel();
  await Model.deleteMany({});
  console.log('Migration down: Configurations removed');
}

module.exports = { up, down };
