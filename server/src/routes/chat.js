const { generateRandomString } = require('../libs/string');
const { Chat, Message } = require('../models');
const { ObjectId } = require('mongoose').Types;

const getChats = async (req, res, next) => {
  const user = req._user;
  let participants = [user._id];

  const _with = req.query.with;
  if (_with != undefined && _with !== '') {
    participants.push(_with);
  }

  const chats = await Chat.find( { participants: { $all: participants } } )
  return res.json(chats);
}

const newChat = async (req, res, next) => {
  const user = req._user;

  let participants = req.body.participants;
  let participantNames = req.body.participantNames;

  // Add the current user to the participant list
  participants.push(user._id);
  participantNames[user._id] = user.fullName;

  // Check if there exists a chat thread between these participants
  const chats = await Chat.find( { participants: { $all: participants } } );
  if (chats.length) {
    return res.json({});
  }

  const newChat = new Chat({
    participants: participants,
    participantNames: participantNames,
  })
  await newChat.save();
  return res.json(newChat);
}

const newMessage = async (req, res, next) => {
  const chat = await Chat.findOne({ _id: ObjectId(req.params.chatId) });
  const user = req._user;

  if (chat === undefined) {
    return res.json({});
  }
  // Check if this user has the permission to send a message in this chat thread
  if (!chat.participants.includes(user._id)) {
    return res.json({});
  }
  
  const text = req.body.text;
  const newMessage = new Message({
    chatId: chat._id,
    senderId: user._id,
    text: text
  })
  await newMessage.save();

  // Update the chat
  chat.lastMessage = newMessage.text;
  chat.lastMessageTimestamp = newMessage.createdAt;
  await chat.save();

  return res.json(newMessage);
}

const getMessages = async (req, res, next) => {
  const chatId = req.params.chatId;
  const user = req._user;
  const chat = await Chat.findOne({ _id: ObjectId(chatId) });

  if (chat === undefined) {
    return res.json([]);
  }
  // Check if this user has the permission to send a message in this chat thread
  if (!chat.participants.includes(user._id)) {
    return res.json([]);
  }

  const messages = await Message.find({ chatId: chatId });
  return res.json(messages);
}

module.exports = {
  getChats,
  getMessages,
  newChat,
  newMessage
}