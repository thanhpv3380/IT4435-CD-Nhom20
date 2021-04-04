const mongoose = require('mongoose');

const { ObjectId } = mongoose.Types;

const resultSchema = new mongoose.Schema(
  {
    participant: {
      type: ObjectId,
      ref: 'User',
    },
    score: Number,
    history: [
      {
        question: {
          type: ObjectId,
          ref: 'Question',
        },
        choice: Number,
      },
    ],
    comment: String,
    doTime: Number,
    contest: {
      type: ObjectId,
      ref: 'Contest',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

module.exports = mongoose.model('Result', resultSchema);
