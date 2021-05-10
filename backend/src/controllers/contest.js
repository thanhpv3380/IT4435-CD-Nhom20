const contestService = require('../services/contest');

const getAllContest = async (req, res) => {
  const { sort, fields } = req.query;
  const { data, metadata } = await contestService.findAllContest({
    sort,
    fields,
  });
  return res.send({
    status: 1,
    result: {
      data,
      metadata,
    },
  });
};

const getAllContestJoined = async (req, res) => {
  const { sort, fields } = req.query;
  const { user } = req;
  const { data, metadata } = await contestService.findAllContestJoined({
    userId: user._id,
    sort,
    fields,
  });
  return res.send({
    status: 1,
    result: {
      data,
      metadata,
    },
  });
};

const getAllContestByUser = async (req, res) => {
  const { sort, fields } = req.query;
  const { user } = req;
  const { data, metadata } = await contestService.findAllContestByUser({
    userId: user._id,
    sort,
    fields,
  });
  return res.send({
    status: 1,
    result: {
      data,
      metadata,
    },
  });
};

const getContest = async (req, res) => {
  const { id } = req.params;
  const contest = await contestService.findContestById(id);
  return res.send({ status: 1, result: { contest } });
};

const createContest = async (req, res) => {
  const data = req.body;
  const { user } = req;
  const contest = await contestService.createContest({
    ...data,
    userId: user._id,
  });
  return res.send({ status: 1, result: { contest } });
};

const updateContest = async (req, res) => {
  const data = req.body;
  const { id } = req.params;
  const { user } = req;
  const contest = await contestService.updateContest(id, data, user._id);
  return res.send({ status: 1, result: { contest } });
};

const deleteContest = async (req, res) => {
  const { id } = req.params;
  await contestService.deleteContest(id);
  return res.send({ status: 1 });
};

module.exports = {
  getAllContest,
  getAllContestJoined,
  getAllContestByUser,
  getContest,
  createContest,
  updateContest,
  deleteContest,
};
