const mongoose = require('mongoose');

const userSchema = require('./user');
const chatSchema = require('./chat');
const messageSchema = require('./message');

const models = {
  User: mongoose.model('User', userSchema),
  Chat: mongoose.model('Chat', chatSchema),
  Message: mongoose.model('Message', messageSchema),
};

mongoose.connection.on('connected', () => {
  Object.values(models).forEach(model => {
    model.createCollection();
  });
});

module.exports = models;