const mongoose = require('mongoose');

const QuestionSchema = mongoose.Schema({
  questionText: {
    type: String,
    required: true,
  },
  options: [{
    type: String,
    required: true
  }],
  correctOption: {
    type: String, // Store the correct option text
    required: true,
  },
}, {
  _id: true, // Ensure questions have an _id
});

const OnlineTestSchema = mongoose.Schema({
  schoolId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'School',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  duration: {
    type: Number, // Duration in minutes
    required: true,
  },
  questions: [QuestionSchema],
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('OnlineTest', OnlineTestSchema);
