const jwt = require('jsonwebtoken');

const CustomError = require('../errors/CustomError');
const errorCodes = require('../errors/code');

const userDao = require('../daos/user');
const {
  comparePassword,
  generateAccessToken,
  generatePassword,
} = require('../utils/auth');
const { JWT_SECRET_KEY } = require('../configs');

const login = async (email, password) => {
  const user = await userDao.findUser({ email });
  if (!user) throw new CustomError(errorCodes.USER_NOT_FOUND);

  const isCorrectPassword = await comparePassword(password, user.password);
  if (!isCorrectPassword) throw new CustomError(errorCodes.WRONG_PASSWORD);

  const userId = user._id;
  const accessToken = await generateAccessToken(userId);
  return accessToken;
};

const loginByThirdParty = async ({ email, name, picture }) => {
  let user = await userDao.findUser({ email });
  if (!user) {
    user = await userDao.createUser({ email, name, avatar: picture });
  } else {
    await userDao.updateUser(user._id, { name, avatar: picture });
  }

  const userId = user._id;
  const accessToken = await generateAccessToken(userId);
  return accessToken;
};

const verifyAccessToken = async (accessToken) => {
  const data = await jwt.verify(accessToken, JWT_SECRET_KEY);
  const { userId } = data;

  const user = await userDao.findUser(userId);
  return user;
};

const register = async ({ email, name, password }) => {
  password = await generatePassword(password);
  const user = await userDao.createUser({ email, name, password });
  return user;
};

module.exports = {
  login,
  loginByThirdParty,
  register,
  verifyAccessToken,
};
