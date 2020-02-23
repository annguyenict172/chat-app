const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Types;

const messageSchema = new Schema({
  senderId: { type: ObjectId, required: true },
  chatId: { type: ObjectId, required: true },
  text: { type: String, max: 250 },
  createdAt: { type: Number, required: true, default: new Date().getTime() },
  updatedAt: { type: Number, required: true, default: new Date().getTime() },
});

messageSchema.pre('save', (next) => {
  this.updatedAt = new Date().getTime();
  next();
});

messageSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.__v;
  return obj;
}

module.exports = messageSchema;