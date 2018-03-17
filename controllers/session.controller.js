const passport = require('passport');
const ApiError = require('../models/api-error.model');
const mongoose = require('mongoose');
const User = require('../models/user.model');

module.exports.signup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({email: this.email})
  .then(user => {
    if (user != null) {
      next(new ApiError('User already registered', 400));
    } else {
      user = new User({
        email: req.body.email,
        password: req.body.password
      });
      user
        .save()
        .then(() => {
          res.status(200).json({ message: 'Success' });
        })
        .catch(error => {
          if (error instanceof mongoose.Error.ValidationError) {
            next(new ApiError(error.errors, 400));
          } else {
            next(error);
          }
        });
    }
  })
  .catch(error => next(error));
}

module.exports.create = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    next(new ApiError('Email and password are required', 400));
  } else {
    passport.authenticate('local-auth', (err, user, message) => {
      if (err) {
        next(err);
      } else if (!user) {
        next(new ApiError(message, 401));
      } else {
        req.login(user, (err) => {
          if (err) {
            next(err);
          } else {
            res.json(user);
          }
        });
      }
    })(req, res, next);
  }
};

module.exports.destroy = (req, res, next) => {
  req.logout();
  res.status(200).json({ message: 'Success' });
};
