const CustomError = require('../errors/CustomError');
const errorCodes = require('../errors/code');

const questionDao = require('../daos/question');

const findAllQuestionByGroupQuestion = async ({
  groupQuestionId,
  key,
  limit,
  offset,
  sort,
  query,
}) => {
  const { data, metadata } = await questionDao.findAllQuestion({
    key,
    searchFields: ['title', 'description'],
    query: { ...query, groupQuestion: groupQuestionId },
    offset,
    limit,
    sort,
  });

  return { data, metadata };
};

const findQuestionById = async (id) => {
  const question = await questionDao.findQuestion({ _id: id }, null, [
    'groupQuestion',
  ]);
  if (!question) {
    throw new CustomError(errorCodes.NOT_FOUND);
  }
  return question;
};

const createQuestion = async ({
  title,
  description,
  explainAnswer,
  answers,
  correctAnswer,
  level,
  groupQuestion,
}) => {
  const question = await questionDao.createQuestion({
    title,
    description,
    explainAnswer,
    answers,
    correctAnswer,
    level,
    groupQuestion,
  });
  return question;
};

const updateQuestion = async (id, data) => {
  const question = await questionDao.updateQuestion(id, data);
  return question;
};

const deleteQuestion = async (id) => {
  await questionDao.deleteQuestion(id);
};

module.exports = {
  findAllQuestionByGroupQuestion,
  findQuestionById,
  createQuestion,
  updateQuestion,
  deleteQuestion,
};
