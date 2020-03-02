const { User } = require('../models');
const { createAuthToken } = require('../libs/auth');
const pw = require('../libs/pw');
const errors = require('../libs/errors');
const { uploadImage } = require('../libs/imageUpload');

const signUpByEmail = async (req, res, next) => {
  const { email, password, firstName, lastName } = req.body;
  const avatar = req.file;

  // Check if this email has been used
  const user = await User.findOne({ email: email });
  if (user !== null) {
    return res.jsonError(
      errors.badRequestError('This email has already been registered.')
    );
  }
  
  // Create password hash and salt
  const passwordSalt = pw.createPasswordSalt();
  const passwordHash = pw.createPasswordHash(password, passwordSalt);

  try {
    const newUser = User({
      email: email,
      passwordHash: passwordHash,
      passwordSalt: passwordSalt,
      firstName: firstName,
      lastName: lastName,
      fullName: `${firstName} ${lastName}`, 
    });

    // Save the user to database
    await newUser.save();

    await uploadImage(avatar.path, newUser._id.toString());

    return res.json({ 
      accessToken: createAuthToken(newUser),
      user: newUser
    });
  } catch (error) {
    throw error;
  }
}

const loginByEmail = async (req, res, next) => {
  const { email, password } = req.body;

  // Check if user exists
  const user = await User.findOne({ email: email });
  if (user === null) {
    return res.jsonError(errors.invalidCredentialError());
  }

  const passwordHash = pw.createPasswordHash(password, user.passwordSalt);
  if (passwordHash !== user.passwordHash) {
    return res.jsonError(errors.invalidCredentialError());
  }

  return res.json({ 
    accessToken: createAuthToken(user),
    user: user
  });
}

module.exports = {
  signUpByEmail,
  loginByEmail
};