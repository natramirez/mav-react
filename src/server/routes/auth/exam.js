// server/routes/api/signin.js
const Questions = require('../../models/Questions');
const express = require('express');

var router = new express.Router();

// module.exports = (app) => {

router.get('/questions', function(req, res) {
    // if (connectFailed) {
    //     res.send({'name':'MongoError'})
    // };
    if (req.query && req.query.numQuestions) {
        var numQuestions = JSON.parse(req.query.numQuestions);      
    }
    //looks at our Question Schema
    Questions.aggregate({'$sample': { 'size': numQuestions }})
    .exec(function(err, questions) {
        if (err) {
        console.log('err: ' + err);
        res.send(err);
        }
        res.json(questions);
    });
    });


module.exports = router;

// };