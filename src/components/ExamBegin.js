import React, { Component } from 'react';
import axios from 'axios';


class ExamBegin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questions:[]
        }
        this.requestExam = this.requestExam.bind(this);
    }

    requestExam(numQuestions) {
        var serverURL = 'http://localhost:3001/api/questions';
        axios.get(serverURL,{
            params: {
              numQuestions: numQuestions
            }
          })
        .then(res => {
          console.log('res.data: '+ JSON.stringify(res.data));
          this.setState({ questions: res.data });
          console.log(this.state.questions);          
        })
    }
    // Page Title
    // Progress bar
    // question-answer-container
        // Question number
        // Question text
        // answer-form
            // Answer choices list
            // Continue button
        // Error message div
  render() {
    return (
        <div className="exam-content">
            <p className="welcome-lead">
                <a href='#' onClick={ this.requestExam.bind(this, 1) }>Comenzar examen</a>
            </p>
        </div>
    );
  }
}

export default ExamBegin;