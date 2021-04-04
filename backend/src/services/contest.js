const CustomError = require('../errors/CustomError');
const errorCodes = require('../errors/code');

const contestDao = require('../daos/contest');

const findAllContestByUser = async ({
  userId,
  key,
  limit,
  offset,
  sort,
  query,
}) => {
  const { data, metadata } = await contestDao.findAllContest({
    key,
    searchFields: ['title', 'description'],
    query: { ...query, createdBy: userId },
    offset,
    limit,
    sort,
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
  findAllContestByUser,
  findContestById,
  createContest,
  updateContest,
  deleteContest,
};
