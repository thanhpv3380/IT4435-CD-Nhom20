const CustomError = require('../errors/CustomError');
const errorCodes = require('../errors/code');

const contestDao = require('../daos/contest');
const resultDao = require('../daos/result');

const findAllContest = async ({ sort, fields }) => {
  const { data, metadata } = await contestDao.findAllContest({
    fields,
    sort,
    query: { isActive: true },
    populate: ['createdBy'],
  });
  return { data, metadata };
};

const findAllContestJoined = async ({ userId, sort, fields }) => {
  const { data, metadata } = await resultDao.findAllResult({
    query: {
      participant: userId,
    },
    sort,
    fields,
    populate: {
      path: 'contest',
      populate: { path: 'createdBy' },
    },
  });
  return { data, metadata };
};

const findAllContestByUser = async ({ userId, sort, fields }) => {
  const { data, metadata } = await contestDao.findAllContest({
    fields,
    sort,
    query: { createdBy: userId },
  });
  return { data, metadata };
};

const findContestById = async (id) => {
  const contest = await contestDao.findContest({ _id: id }, null, [
    'createdBy',
  ]);
  if (!contest) {
    throw new CustomError(errorCodes.NOT_FOUND);
  }
  return contest;
};

const createContest = async ({
  title,
  description,
  imageUrl,
  userId,
  startTime,
  endTime,
  examTime,
  amountQuestion,
  groupQuestion,
  isPublic,
  code,
  password,
}) => {
  const contest = await contestDao.createContest({
    title,
    description,
    imageUrl,
    createdBy: userId,
    startTime,
    endTime,
    examTime,
    amountQuestion,
    groupQuestion,
    isPublic,
    code,
    password,
  });
  return contest;
};

const updateContest = async (id, data) => {
  const contest = await contestDao.updateContest(id, data);
  return contest;
};

const deleteContest = async (id) => {
  await contestDao.deleteContest(id);
};

module.exports = {
  findAllContest,
  findAllContestJoined,
  findAllContestByUser,
  findContestById,
  createContest,
  updateContest,
  deleteContest,
};
