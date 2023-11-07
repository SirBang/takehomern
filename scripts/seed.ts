import {Session, User} from 'back-end/src/services/db';
import {hashSync} from 'bcrypt'

(async () => {
  console.log('Creating tables...');
  await User.sync({force: true});
  await Session.sync({force: true});

  console.log('Generating data...');
  const _users = [
    ['admin', 'admin'],
    ['test', 'test'],
    ['user', 'password'],
  ]
  try {
    await User.bulkCreate(
      _users
        .map(u => ({
          username: u[0],
          password: hashSync(u[1], 12),
          registered: new Date(),
        }))
    )
    console.log('DB seeded. Default users:\n', _users)
  } catch (e) {
    console.error('Failed to create seed users.\n', e)
    process.exit(1)
  }
})();
