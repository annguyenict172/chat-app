const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const { catchError } = require('../libs/errorHandler');
const { requireTokenAuth } = require('../libs/auth');

const { signUpByEmail, loginByEmail } = require('./auth');
const { getMyInfo, getUsers } = require('./user');
const { getChats, newChat, getMessages, newMessage } = require('./chat');

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

// Get my info
router.get('/users/me', catchError(requireTokenAuth(getMyInfo)));

// Get users
router.get('/users', catchError(requireTokenAuth(getUsers)));

// Get chats
router.get('/chats', catchError(requireTokenAuth(getChats)));

// Create new chat
router.post('/chats', catchError(requireTokenAuth(newChat)));

// Get messages
router.get('/chats/:chatId/messages', catchError(requireTokenAuth(getMessages)));

// New message
router.post('/chats/:chatId/messages', catchError(requireTokenAuth(newMessage)));

module.exports = router;