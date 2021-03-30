const { OAuth2Client } = require('google-auth-library');
const authService = require('../services/auth');

const { CLIENT_ID_GOOGLE } = process.env;
const client = new OAuth2Client(CLIENT_ID_GOOGLE);

const register = async (req, res) => {
  const { email, name, password } = req.body;
  const user = await authService.register({ email, name, password });
  return res.send({ status: 1, result: user });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const accessToken = await authService.login(email, password);
  return res.send({ status: 1, result: { accessToken } });
};

const loginByGoogle = async (req, res) => {
  const { tokenId } = req.body;
  const data = await client.verifyIdToken({
    idToken: tokenId,
    audience: CLIENT_ID_GOOGLE,
  });
  const { email_verfied, name, email } = data.getPayload;

  const accessToken = await authService.login(email);
  return res.send({ status: 1, result: { accessToken } });
};

const loginByFacebook = async (req, res) => {
  const { accessToken, userID } = req.body;
  const urlFacebok = `https://graph.facebook.com/v10.0/${userID}?fields=id,name,email,birthday&access_token=${accessToken}`;
  const data = await fetch(urlFacebok, { method: 'GET' });
  const { name, email } = data;
  const token = await authService.login(email);
  return res.send({ status: 1, result: { accessToken: token } });
};

const verifyAccessToken = async (req, res) => {
  const { accessToken } = req;
  const { user } = await authService.verifyAccessToken(accessToken);
  res.send({ status: 1, result: { user } });
};

module.exports = {
  register,
  login,
  loginByGoogle,
  loginByFacebook,
  verifyAccessToken,
};
