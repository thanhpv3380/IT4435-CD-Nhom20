const {
  PORT,
  DOMAIN_NAME,

  MONGO_HOST,
  MONGO_PORT,
  MONGO_DATABASE,
  MONGO_USERNAME,
  MONGO_PASSWORD,

  JWT_SECRET_KEY,
  JWT_EXPIRES_TIME,
} = process.env;

const { A_WEEK } = require('../constants');

module.exports = {
  PORT: PORT || 3000,
  DOMAIN_NAME: DOMAIN_NAME || 'http://localhost:3000',
  MONGO_URI: `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}?authSource=admin`,
  MONGO_URI_CLOUD: `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DATABASE}?retryWrites=true&w=majority`,
  JWT_SECRET_KEY,
  JWT_EXPIRES_TIME: parseInt(JWT_EXPIRES_TIME, 10) || A_WEEK,
};
