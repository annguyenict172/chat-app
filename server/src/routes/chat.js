const { Chat, Message } = require('../models');
const { ObjectId } = require('mongoose').Types;
const chatService = require('../libs/chatService');
const errors = require('../libs/errors');

const connectToChatService = async (req, res, next) => {
  chatService.saveUserConnection(req._user._id);
  return res.json({});
}

const getChats = async (req, res, next) => {
  const offset = req.query.offset || 0;
  const user = req._user;
  let participants = [user._id];

  const _with = req.query.with;
  if (_with != undefined && _with !== '') {
    participants.push(_with);
  }

  const chats = await Chat.find( { participants: { $all: participants } } )
    .skip(parseInt(offset))
    .limit(12)
    .sort({lastMessageTimestamp: -1});
  return res.json(chats);
}

const newChat = async (req, res, next) => {
  const user = req._user;

  let participants = req.body.participants;
  let participantNames = req.body.participantNames;

  if (!participants.includes(user._id.toString())) {
    return res.jsonError(
      errors.forbiddenError()
    );
  }
  // Check if there exists a chat thread between these participants
  const chats = await Chat.find( { participants: { $all: participants } } );
  if (chats.length) {
    return res.jsonError(
      errors.badRequestError('A chat thread between these people already exists')
    );
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
    return res.jsonError(
      errors.notFoundError('Cannot find a chat with the provided ID')
    );
  }
  // Check if this user has the permission to send a message in this chat thread
  if (!chat.participants.includes(user._id)) {
    return res.jsonError(
      errors.forbiddenError()
    );
  }
  
  const text = req.body.text;
  const newMessage = new Message({
    chatId: chat._id,
    senderId: user._id,
    text: text,
    createdAt: new Date().getTime()
  });
  await newMessage.save();

  // Update the chat
  chat.lastMessage = newMessage.text;
  chat.lastMessageTimestamp = newMessage.createdAt;
  chat.seen = [user._id];
  await chat.save();

  // Send new message event through socket
  chat.participants.forEach(participant => {
    if (participant.toString() !== user._id.toString()) {
      chatService.sendNewMessageEvent(participant._id, chat, newMessage);
    }
  })

  return res.json(newMessage);
}

const getMessages = async (req, res, next) => {
  const offset = req.query.offset || 0;
  const chatId = req.params.chatId;
  const user = req._user;
  const chat = await Chat.findOne({ _id: ObjectId(chatId) });

  if (chat === undefined) {
    return res.jsonError(
      errors.notFoundError('Cannot find a chat with the provided ID')
    );
  }
  // Check if this user has the permission to send a message in this chat thread
  if (!chat.participants.includes(user._id)) {
    return res.jsonError(
      errors.forbiddenError()
    );
  }

  const messages = await Message.find({ chatId: chatId })
    .skip(parseInt(offset))
    .limit(20)
    .sort({createdAt: -1});
  return res.json(messages.reverse());
}

const seenChat = async (req, res, next) => {
  const chatId = req.params.chatId;
  const user = req._user;
  const chat = await Chat.findOne({ _id: ObjectId(chatId) });

  if (chat === undefined) {
    return res.jsonError(
      errors.notFoundError('Cannot find a chat with the provided ID')
    );
  }
  
  if (!chat.participants.includes(user._id)) {
    return res.jsonError(
      errors.forbiddenError()
    );
  }

  await Chat.update( 
    { _id: ObjectId(chatId) },
    { '$addToSet': { 'seen': user._id } }
  )
  return res.json({});
}

module.exports = {
  getChats,
  getMessages,
  newChat,
  newMessage,
  connectToChatService,
  seenChat
}