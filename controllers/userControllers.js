const bcrypt = require('bcryptjs');
const mysql = require('mysql2/promise'); // using promise version of mysql2
const pool = require('../config/database');

exports.register = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const { email, name, lastname, address, postCode, city } = req.body;
    // customer is default, other roles are for admins only
    const defaultRole = 'customer';
    const [results] = await pool.execute(
      'INSERT INTO users (email, name, lastname, password, address, post_code, city, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [email, name, lastname, hashedPassword, address, postCode, city, defaultRole]
    );
    //  registration success
    res.redirect('/login');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error: ' + err.message);
  }
};


exports.login = async (req, res) => {
  try {
    const [users] = await pool.execute('SELECT * FROM users WHERE email = ?', [req.body.email]);
    if (users.length === 0) {
      return res.status(400).send('User not found');
    }
    const user = users[0];
    const match = await bcrypt.compare(req.body.password, user.password);
    if (match) {
      // = login success
      res.redirect('/dashboard');
    } else {
      //  failed login
      res.status(400).send('Incorrect password');
    }
  } catch (err) {
    //  errors
    res.status(500).send('Server error');
  }
};

exports.logout = (req, res) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    req.session.destroy(() => {
      res.clearCookie('connect.sid'); // clear the session cookie
      res.redirect('/login'); // Redirect
    });
  });
};

exports.updateAccount = async (req, res) => {
  const userId = req.user.id;
  const { name, lastname, email, address, postCode, city, oldPassword, newPassword } = req.body;

  try {
    let query;
    let params;

    // Check and hash new password if old and new passwords are entere in the form
    if (oldPassword && newPassword) {
      const [users] = await pool.execute('SELECT password FROM users WHERE id = ?', [userId]);
      if (users.length === 0) {
        return res.status(400).send('User not found');
      }
      const user = users[0];
      const match = await bcrypt.compare(oldPassword, user.password);
      if (!match) {
        return res.status(400).send('Incorrect old password');
      }
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      query = 'UPDATE users SET name = ?, lastname = ?, email = ?, address = ?, post_code = ?, city = ?, password = ? WHERE id = ?';
      params = [name, lastname, email, address, postCode, city, hashedNewPassword, userId];
    } else {
      query = 'UPDATE users SET name = ?, lastname = ?, email = ?, address = ?, post_code = ?, city = ? WHERE id = ?';
      params = [name, lastname, email, address, postCode, city, userId];
    }

    await pool.execute(query, params);

    res.redirect('/account'); // Redirect to acount page 
  } catch (err) {
    console.error('Error executing the update account query:', err);
    res.status(500).send('Server error: ' + err.message);
  }
};



