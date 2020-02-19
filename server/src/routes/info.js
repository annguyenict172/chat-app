const errors = require('../libs/errors');

const getInfo = async (req, res, next) => {
  const user = req._user;
  return res.json(user);
}

module.exports = {
  getInfo
};