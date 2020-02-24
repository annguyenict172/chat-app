const { User } = require('../models');

const getMyInfo = async (req, res, next) => {
  const user = req._user;
  return res.json(user);
}

const getUsers = async (req, res, next) => {
  const query = req.query.q;
  if (query === '') return res.json([]);

  const re = new RegExp(query, 'g');
  const users = await User.find( { $or:[ { fullName: re }, { email: re } ]} );
  return res.json(users);
}

module.exports = {
  getMyInfo,
  getUsers
};