//model/ExamData.js
'use strict';
const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

const ExamData = new mongoose.Schema({
  numQuestions: {
    type: Number
  },
  numCorrect: {
    type: Number,
    default: 0
  },
  numIncorrect: {
    type: Number,
    default: 0
  },
  questions: {
    type: [Number]
  },
  dateTaken: {
    type: Date,
    default: Date.now()
  }
});
// UserSchema.methods.generateHash = function(password) {
//   return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
// };
// UserSchema.methods.validPassword = function(password) {
//   return bcrypt.compareSync(password, this.password);
// };
module.exports = mongoose.model('ExamData', ExamData);