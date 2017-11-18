const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post('/login', function(req, res, next) {
  console.log(req.body);
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUserName(username, function(err, user) {
    if (err) {
      console.log(err);
    } else if (!user) {
      return res.json({ success: false });
    }

    User.authenticateUser(username, user.password, password, function(err, isMatch) {
      console.log('BACK IN ROUTES');
      if (err) {
        console.log(err);
      }
      if (isMatch) {
        return res.json({ success: true });
      } else {
        return res.json({ success: false });
      }
    });
  });
});

router.get('/login', function(req, res, next) {
  if (req.session && req.session.user) {
    const username = req.session.user.username;

    User.getUserByUsername(username, function(err, user) {
      if (err) {
        console.log(err);
      } else if (!user) {
        req.session.reset();
        res.redirect('/');
      } else {
        res.locals.user = user;
        res.redirect('/');
      }
    });
  } else {
    res.redirect('/');
  }
});

router.post('/register', function(req, res, next) {
  let newUser = new User({
    username: req.body.username,
    password: req.body.password
  });

  User.addUser(newUser, function(err, user) {
    if (err) {
      res.json({ success: false });
    } else {
      res.json({ success: true });
    }
  });
});

module.exports = router;