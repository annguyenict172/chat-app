const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Types;

const chatSchema = new Schema({
  participants: [ObjectId],
  participantNames: { type: Object, required: true },
  lastMessage: { type: String, max: 250 },
  lastMessageTimestamp: { type: Number },
  lastMessageSender: { type: ObjectId },
  seen: { type: [ObjectId], default: [] },
  createdAt: { type: Number, required: true, default: new Date().getTime() },
  updatedAt: { type: Number, required: true, default: new Date().getTime() },
});

chatSchema.pre('save', (next) => {
  this.updatedAt = new Date().getTime();
  next();
});

chatSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.__v;
  return obj;
}

module.exports = chatSchema; 