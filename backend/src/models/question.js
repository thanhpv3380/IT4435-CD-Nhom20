const mongoose = require('mongoose');

const { ObjectId } = mongoose.Types;

const questionSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    explainAnswer: String,
    answer: [
      {
        position: Number,
        title: String,
        description: String,
      },
    ],
    correctAnswer: Number,
    level: String, // EASY, MEDIUM, HARD
    groupQuestion: {
      type: ObjectId,
      ref: 'Group Question',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

module.exports = mongoose.model('Question', questionSchema);
