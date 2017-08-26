import React, { Component } from 'react';
import axios from 'axios';
import { Circle } from 'rc-progress';



class ExamResults extends Component {
    constructor(props) {
        super(props);
        this.getNumberCorrect = this.getNumberCorrect.bind(this);
        this.getNumberIncorrect = this.getNumberIncorrect.bind(this);
        this.getGradePercent = this.getGradePercent.bind(this);
    }
    getNumberCorrect() {
        var numCorrect = 0;
        for (var i = 0; i < this.props.questions.length; i++) {
            if (this.props.userAnswers[i] === this.props.questions[i].correct_ans) {
                numCorrect++;
            }
        }
        return numCorrect;
    }
    getNumberIncorrect(numCorrect) {
        return this.props.questions.length - numCorrect;
    }

    getGradePercent(numCorrect) {
        return numCorrect/this.props.questions.length * 100;
    }
    isPassed(percent) {
        return percent >= 80;
    }
    render() {
        console.log('props questions: ' + JSON.stringify(this.props.questions));
        console.log('props answers: ' + this.props.userAnswers);

        var numCorrect = this.getNumberCorrect();
        var numIncorrect = this.getNumberIncorrect(numCorrect);
        var gradePercent = this.getGradePercent(numCorrect);
        var circleColor;
        if (this.isPassed(gradePercent)) circleColor = '#409628';
        else                             circleColor = '#ba1509';
        
        return (
            <div className="exam-content">
                <h2>Resultados</h2>
                <GradeCircle percent={gradePercent} color={circleColor}/>

            </div>
        );
    }
}

class GradeCircle extends Component {
    render() {   
      return (
          <div className="grade-circle">
            <Circle percent={this.props.percent} strokeWidth="3" strokeColor={this.props.color} />
            <span>{this.props.percent}%</span>
          </div>
      )
    }
  }

export default ExamResults;