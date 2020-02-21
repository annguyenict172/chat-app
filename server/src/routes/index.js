const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const { catchError } = require('../libs/errorHandler');
const { requireTokenAuth } = require('../libs/auth');

const { signUpByEmail, loginByEmail } = require('./auth');
const { getInfo } = require('./info');
const { getMyInfo } = require('./me');
const { getChats } = require('./chat');

// Sign up
router.post('/users/signup', [
  check('email').isEmail(),
  check('firstName').isString().isLength({ min: 1 }),
  check('lastName').isString().isLength({ min: 1 }),
  check('password').isString().isLength({ min: 6 })
], catchError(signUpByEmail));

// Login
router.post('/users/login', [
  check('email').isEmail(),
  check('password').isString().isLength({ min: 6 })
], catchError(loginByEmail));

// Get user info
router.get('/users/:userId', catchError(requireTokenAuth(getInfo)));

// Get my info
router.get('/users/me', catchError(requireTokenAuth(getMyInfo)));

// Get chats
router.get('/users/me/chats', catchError(requireTokenAuth(getChats)));

module.exports = router;