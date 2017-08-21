//model/questions.js
'use strict';
//import dependency
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create new instance of the mongoose.schema. the schema takes an object that shows
//the shape of your database entries.
var QuestionsSchema = new Schema({
    question: String,
    answers: [
        {
            ans: String,
            ans_id: Number
        }
    ],
    correct_ans: Number
}, { collection : 'ExamQuestions' });

//export our module to use in server.js
module.exports = mongoose.model('Questions', QuestionsSchema);