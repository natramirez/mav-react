//model/Questions.js
'use strict';
const mongoose = require('mongoose');

var QuestionsSchema = new mongoose.Schema({
    question: String,
    answers: [
        {
            ans: String,
            ans_id: Number
        }
    ],
    correctAnswer: Number,
    selectedAnswer: Number,
}, { collection : 'ExamQuestions' });

module.exports = mongoose.model('Questions', QuestionsSchema);