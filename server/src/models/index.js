const mongoose = require('mongoose');

const userSchema = require('./user');

const models = {
  User: mongoose.model('User', userSchema),
};

mongoose.connection.on('connected', () => {
  Object.values(models).forEach(model => {
    model.createCollection();
  });
});

module.exports = models;