const userService = require('../services/user');

const updateUser = async (req, res) => {
  const data = req.body;
  const { user } = req;
  const userInfo = await userService.updateUser(user._id, data);
  return res.send({ status: 1, result: { user: userInfo } });
};

module.exports = { updateUser };
