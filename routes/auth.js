const express = require('express');
const passport = require('passport');
const router = express.Router();
const userController = require('../controllers/userControllers');


router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/logout', userController.logout);

// authenticate the passport
router.post('/login',
  passport.authenticate('local', { 
    successRedirect: '/', 
    failureRedirect: '/login', 
    failureFlash: true 
  })
);

router.post('/update-account', userController.updateAccount);

module.exports = router;
