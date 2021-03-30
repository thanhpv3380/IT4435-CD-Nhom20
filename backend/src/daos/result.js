const Result = require('../models/result');
const { findAll, findByCondition } = require('../utils/db');

const findAllResult = async ({
  key,
  searchFields,
  query,
  offset,
  limit,
  fields,
  sort,
  populate,
}) => {
  const { data, metadata } = await findAll({
    model: Result,
    key,
    searchFields,
    query,
    offset,
    limit,
    fields,
    sort,
    populate,
  });
  return {
    data,
    metadata,
  };
};

const findResult = async (condition, fields, populate) => {
  const result = await findByCondition(Result, condition, fields, populate);
  return result;
};

const createResult = async ({
  participant,
  score,
  history,
  comment,
  doTime,
  contest,
}) => {
  const result = await Result.create({
    participant,
    score,
    history,
    comment,
    doTime,
    contest,
  });

  return result;
};

const updateResult = async (id, data) => {
  const result = await Result.findByIdAndUpdate(id, data, {
    new: true,
  });
  return result;
};

const deleteResult = async (id) => {
  await Result.findByIdAndDelete(id);
};

module.exports = {
  findAllResult,
  findResult,
  createResult,
  updateResult,
  deleteResult,
};
