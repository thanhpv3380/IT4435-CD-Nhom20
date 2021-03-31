const router = require('express').Router();
const asyncMiddleware = require('../middlewares/async');
const { auth } = require('../middlewares/auth');
const { loginValidate, registerValidate } = require('../validations/auth');
const authController = require('../controllers/auth');

router.post(
  '/auths/register',
  registerValidate,
  asyncMiddleware(authController.register),
);

router.post(
  '/auths/login',
  loginValidate,
  asyncMiddleware(authController.login),
);

router.post(
  '/auths/loginByGoogle',
  asyncMiddleware(authController.loginByGoogle),
);

router.post(
  '/auths/loginByFacebook',
  asyncMiddleware(authController.loginByFacebook),
);

router.get(
  '/auths/verify',
  auth,
  asyncMiddleware(authController.verifyAccessToken),
);

module.exports = router;
