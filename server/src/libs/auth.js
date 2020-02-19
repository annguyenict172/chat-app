const jwt = require('jsonwebtoken');
const { User } = require('../models');
const errors = require('./errors');

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

const requireTokenAuth = (handler) => (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Validate Authorization Header
  if (authHeader == undefined) {
    return res.jsonError(errors.unauthorizedError());
  } else if (!authHeader.startsWith('Bearer')) {
    return res.jsonError(errors.unauthorizedError());
  }

  // Retrieve the token from the Authorization Header
  const token = authHeader.substring(authHeader.search('Bearer ') + 7);

  jwt.verify(token, JWT_SECRET, (err, payload) => {
    if (payload == undefined || payload.id == undefined) {
      return res.jsonError(errors.unauthorizedError());
    }
    User.findOne({ _id: payload.id })
      .then(user => {
        if (user == null) {
          return res.jsonError(errors.unauthorizedError());
        } else {
          // Assign the user object to the request
          req._user = user;
          return handler(req, res, next);
        }
      });
  });
}

const createAuthToken = (user) => {
  const payload = {
    id: user._id,
  }
  const token = jwt.sign(payload, JWT_SECRET);
  return token;
}

module.exports = {
  requireTokenAuth,
  createAuthToken
}