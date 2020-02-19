const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true, max: 30 },
  firstName: { type: String, required: true, max: 10 },
  lastName: { type: String, required: true, max: 10 },
  passwordHash: { type: String, required: true, max: 30 },
  passwordSalt: { type: String, required: true, max: 30 },
  createdAt: { type: Number, required: true, default: new Date().getTime() },
  updatedAt: { type: Number, required: true, default: new Date().getTime() },
});

userSchema.pre('save', (next) => {
  this.updatedAt = new Date().getTime();
  next();
});

userSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.passwordHash;
  delete obj.passwordSalt;
  delete obj.__v;
  return obj;
}

module.exports = userSchema; 