const CustomError = require('../errors/CustomError');
const errorCodes = require('../errors/code');

const resultDao = require('../daos/result');

const findAllResultByContest = async ({
  contestId,
  limit,
  offset,
  sort,
  query,
}) => {
  const { data, metadata } = await resultDao.findAllResult({
    query: { ...query, contest: contestId },
    offset,
    limit,
    sort,
  });

  return { data, metadata };
};

const findResultById = async (id) => {
  const result = await resultDao.findResult({ _id: id }, null, [
    'participant',
    'history.question',
  ]);
  if (!result) {
    throw new CustomError(errorCodes.NOT_FOUND);
  }
  return result;
};

const findResult = async (userId, contestId) => {
  const result = await resultDao.findResult(
    { participant: userId, contest: contestId },
    null,
    ['participant', 'history.question'],
  );
  if (!result) {
    throw new CustomError(errorCodes.NOT_FOUND);
  }
  return result;
};

const createResult = async ({ participant, history, doTime, contest }) => {
  const score = 10;
  const result = resultDao.createResult({
    participant,
    score,
    history,
    comment: '',
    doTime,
    contest,
  });

  return result;
};

const updateComment = async ({ resultId, comment }) => {
  const result = resultDao.updateResult(resultId, {
    comment,
  });

  return result;
};

const deleteResult = async (id) => {
  await resultDao.deleteResult(id);
};

module.exports = {
  findAllResultByContest,
  findResultById,
  findResult,
  createResult,
  updateComment,
  deleteResult,
};
