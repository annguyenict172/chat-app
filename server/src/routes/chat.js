const { generateRandomString } = require('../libs/string');

const getChats = async (req, res, next) => {
  const user = req._user;
  let chats = [];
  const isSender = Math.random() >= 0.5;
  for (let i = 0; i < 20; i++) {
    chats.push({
      _id: generateRandomString(),
      sender: isSender ? user._id : generateRandomString(),
      receiver: isSender ? generateRandomString() : user._id,
      senderName: isSender ? "An Nguyen" : "Kin Nguyen",
      receiverName: isSender ? "Kin Nguyen" : "An Nguyen",
      latestMessage: "Hello",
      latestMessageTimestamp: "1581558086028",
      createdOn: 1574909428807
    })
  }
  return res.json(chats);
}

const getMessages = async (req, res, next) => {
  let messages = [];
  for (let i = 0; i < 20; i++) {
    messages.push({
      _id: "5ddf59669e3e5e4641850abb",
      chatId: "5ddf59669e3e5e4641850ab5",
      senderId: Math.random() >= 0.5 ? req._user._id : generateRandomString(),
      text: "Hello World",
      __v: 0,
      createdOn: 1574918502223,
    })
  }
  return res.json(messages)
}

module.exports = {
  getChats,
  getMessages
}