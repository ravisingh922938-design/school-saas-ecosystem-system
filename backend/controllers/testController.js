const asyncHandler = require('express-async-handler');
const OnlineTest = require('../models/OnlineTest');
const User = require('../models/User'); // Assuming User model might be needed for student context

// @desc    Create a new online test
// @route   POST /api/tests
// @access  Private (School Admin/Teacher)
const createTest = asyncHandler(async (req, res) => {
  const { schoolId, title, duration, questions } = req.body;

  if (!schoolId || !title || !duration || !questions || questions.length === 0) {
    res.status(400);
    throw new Error('Please provide all required fields: schoolId, title, duration, and questions');
  }

  const test = await OnlineTest.create({
    schoolId,
    title,
    duration,
    questions,
  });

  if (test) {
    res.status(201).json(test);
  } else {
    res.status(400);
    throw new Error('Invalid test data');
  }
});

// @desc    Submit test results
// @route   POST /api/tests/:id/submit
// @access  Private (Student)
const submitTest = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { studentId, answers } = req.body; // answers format: [{ questionId: '...', selectedOption: '...' }]

  const test = await OnlineTest.findById(id);

  if (!test) {
    res.status(404);
    throw new Error('Test not found');
  }

  // Basic validation for student and answers
  if (!studentId || !answers || !Array.isArray(answers)) {
    res.status(400);
    throw new Error('Please provide studentId and answers array');
  }

  let score = 0;
  let totalQuestions = test.questions.length;
  let correctAnswers = [];
  let incorrectAnswers = [];

  test.questions.forEach((question) => {
    const submittedAnswer = answers.find((ans) => ans.questionId.toString() === question._id.toString()); // Use questionId for matching

    if (submittedAnswer && submittedAnswer.selectedOption === question.correctOption) {
      score++;
      correctAnswers.push({ questionText: question.questionText, selectedOption: submittedAnswer.selectedOption });
    } else if (submittedAnswer) {
      incorrectAnswers.push({ questionText: question.questionText, selectedOption: submittedAnswer.selectedOption, correctOption: question.correctOption });
    } else {
      incorrectAnswers.push({ questionText: question.questionText, selectedOption: null, correctOption: question.correctOption });
    }
  });


  // Here you might want to save the test attempt and score in another model (e.g., TestResult)
  // For now, we'll just return the score.

  res.status(200).json({
    studentId,
    testId: test._id,
    title: test.title,
    score,
    totalQuestions,
    correctAnswers,
    incorrectAnswers,
  });
});

module.exports = {
  createTest,
  submitTest,
};
