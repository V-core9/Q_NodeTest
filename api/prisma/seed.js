const { findUserByEmail, createUserByEmailAndPassword, updateUser } = require('../src/api/users/users.services');

(async () => {
  console.log(await createUserByEmailAndPassword({ username: 'SlavkoV', email: 'slavko.vuletic92@gmail.com', password: '0123456789', isAdmin: true }));
})();
