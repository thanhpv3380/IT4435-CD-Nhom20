const {
  Types: { ObjectId },
} = require('mongoose');
const User = require('../models/user');

const findAllGroupQuestion = async ({}) => {};

module.exports = { createUser, findUser, updateUser, deleteUser };
