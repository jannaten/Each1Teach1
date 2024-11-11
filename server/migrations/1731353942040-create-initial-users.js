const UserService = require('../src/services/UserService');

async function up() {
  // Use UserService to create users
  const userService = new UserService();

  // Define the users to create
  const users = [
    {
      firstName: 'Jannaten',
      lastName: 'Nayem',
      email: 'jannaten.nayem@tuni.fi',
      password: 'demoDEMO123',
      roles: ['superuser']
    },
    {
      firstName: 'Emmanuel',
      lastName: 'Abruquah',
      email: 'emmanuel.abruquah@tuni.fi',
      password: 'demoDEMO123',
      roles: ['superuser']
    },
    {
      firstName: 'Henri',
      lastName: 'Annala',
      email: 'henri.annala@tuni.fi',
      password: 'demoDEMO123',
      roles: ['superuser']
    },
    {
      firstName: 'Masood',
      lastName: 'Ahmadi',
      email: 'masood.ahmadi@tuni.fi',
      password: 'demoDEMO123',
      roles: ['superuser']
    }
  ];

  // Iterate over each user and check if they already exist before creating
  for (const user of users) {
    const existingUser = await userService.getByEmail(user.email);
    if (!existingUser) {
      await userService.create(user);
      console.log(`User created: ${user.email}`);
    } else {
      console.log(`User already exists, skipping: ${user.email}`);
    }
  }
}

async function down() {
  // Clear the created users using their emails
  const userService = new UserService();
  const deleteEmails = [
    'jannaten.nayem@tuni.fi',
    'emmanuel.abruquah@tuni.fi',
    'henri.annala@tuni.fi',
    'masood.ahmadi@tuni.fi'
  ];
  const Model = await UserService.getModel();
  await Model.deleteMany({ email: { $in: deleteEmails } });
  console.log('Migration down: Users removed');
}

module.exports = { up, down };
