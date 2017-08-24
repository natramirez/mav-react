import React, { Component } from 'react';
import axios from 'axios';


class ExamResults extends Component {
  render() {
      console.log('props questions: ' + JSON.stringify(this.props.questions));
      console.log('props answers: ' + this.props.userAnswers);
      
    return (
        <div className="exam-content">
            <h3>Resultados:</h3>
        </div>
    );
  }
}

export default ExamResults;