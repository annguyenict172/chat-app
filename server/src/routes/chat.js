const { generateRandomString } = require('../libs/string');

const getChats = async (req, res, next) => {
  const user = req._user;
  let chats = [];
  for (let i = 0; i < 20; i++) {
    chats.push({
      _id: generateRandomString(),
      sender: user._id,
      receiver: generateRandomString(),
      senderName: "Kin Nguyen",
      receiverName: "An Nguyen",
      latestMessage: "Hello",
      latestMessageTimestamp: "1581558086028",
      createdOn: 1574909428807
    })
  }
  return res.json(chats);
}

module.exports = {
  getChats
}