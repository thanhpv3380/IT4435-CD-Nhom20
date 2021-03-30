const router = require('express').Router();
const asyncMiddleware = require('../middlewares/async');
const { auth } = require('../middlewares/auth');
const { loginValidate, registerValidate } = require('../validations/auth');
const authController = require('../controllers/auth');

/**
 * @swagger
 * /auths/register:
 *   post:
 *     tags:
 *       - Puppies
 *     description: Creates a new puppy
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: puppy
 *         description: Puppy object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Puppy'
 *     responses:
 *       200:
 *         description: Successfully created
 */
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

router.get(
  '/auths/verify',
  auth,
  asyncMiddleware(authController.verifyAccessToken),
);

module.exports = router;
