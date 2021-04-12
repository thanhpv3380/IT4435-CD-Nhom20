const router = require('express').Router();
const asyncMiddleware = require('../middlewares/async');
const { auth } = require('../middlewares/auth');
const userController = require('../controllers/user');

router.put('/users', auth, asyncMiddleware(userController.updateUser));

module.exports = router;
