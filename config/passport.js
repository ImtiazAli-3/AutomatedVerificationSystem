const LocalStrategy = require('passport-local').Strategy; //strategies for passport
const bcrypt = require('bcryptjs'); //require to hash the pwd

const pool = require('./database'); //pool connection

module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
      // Match user from users
      try {
        const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        if (users.length === 0) {
          return done(null, false, { message: 'That email is not registered' });
        }
        // Match password after decryption
        const user = users[0];
        const match = await bcrypt.compare(password, user.password);
        if (match) {
          return done(null, user);
        } else {
          return done(null, false, { message: 'Password incorrect' });
        }
      } catch (err) {
        return done(err);
      }
    })
  );
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const [users] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
      done(null, users[0]);
    } catch (err) {
      done(err, null);
    }
  });
};