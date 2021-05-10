const router = require('express').Router();
const asyncMiddleware = require('../middlewares/async');
const { auth } = require('../middlewares/auth');
const omitReq = require('../middlewares/omitReq');
const contestController = require('../controllers/contest');

router.get('/contests', asyncMiddleware(contestController.getAllContest));
router.get(
  '/contests/joined',
  auth,
  asyncMiddleware(contestController.getAllContestJoined),
);
router.get(
  '/contests/createByUser',
  auth,
  asyncMiddleware(contestController.getAllContestByUser),
);
router.get(
  '/contests/:id',
  auth,
  asyncMiddleware(contestController.getContest),
);
router.post(
  '/contests',
  auth,
  asyncMiddleware(contestController.createContest),
);
router.put(
  '/contests/:id',
  auth,
  omitReq,
  asyncMiddleware(contestController.updateContest),
);
router.delete(
  '/contests/:id',
  auth,
  asyncMiddleware(contestController.deleteContest),
);

module.exports = router;
