//model/ExamHistory.js
'use strict';
const mongoose = require('mongoose');
const ExamData = require('./ExamData');

const ExamHistory = new mongoose.Schema({
  exams: {
    type: [{ExamData}],
    default: ''
  },
  isDeleted: {
    type: Boolean,
    default: false
  },

});
// UserSchema.methods.generateHash = function(password) {
//   return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
// };
// UserSchema.methods.validPassword = function(password) {
//   return bcrypt.compareSync(password, this.password);
// };
module.exports = mongoose.model('ExamHistory', ExamHistory);