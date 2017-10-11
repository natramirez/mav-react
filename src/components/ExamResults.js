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
        var resultsMessage;
        if (this.isPassed(gradePercent)) {
            circleColor = '#409628';
            resultsMessage = "¡Felicidades, has aprobado el examen!";
        }
        else {
            circleColor = '#EC7063';
            resultsMessage = "No has aprobado el examen. Continua estudiando la guia de manejo.";            
        }

        var correctText ="Preguntas correctas";
        var incorrectText = "Preguntas incorrectas";
        if (numCorrect === 1) correctText = "Pregunta correcta";
        if (numIncorrect === 1) incorrectText = "Pregunta incorrecta";

        var examQuestionsList = this.props.questions.map((question, index) => {
            return <ExamQuestion key={index+1} question={question} questionNum={index+1} userAnswer={this.props.userAnswers[index]}/>
        });

        return (
            <div className="exam-content">
                <h2>Resultados</h2>
                <p>{resultsMessage}</p>
                <div className="exam-stats">
                    <GradeCircle percent={gradePercent} color={circleColor}/>
                    <div className="num-correct-stats">
                        <div>
                            <span id="numCorrect">{numCorrect} </span>
                            <span id="correctText">{correctText}</span>
                        </div>
                        <hr />
                        <div>
                            <span id="numIncorrect">{numIncorrect} </span>
                            <span id="incorrectText">{incorrectText}</span>
                        </div>
                    </div>
                </div>
                <div className="exam-questions-container">
                    {examQuestionsList}
                </div>

            </div>
        );
    }
}

class GradeCircle extends Component {
    constructor(props) {
        super(props);
        this.state = {
          percent: 0,
          color: '#ba1509'
        };
        this.increase = this.increase.bind(this);
    }
    componentDidMount() {
        this.increase();
    }
    increase() {
        const percent = this.state.percent + 1;
        if (percent > this.props.percent) {
            clearTimeout(this.tm);
            return;
        }
        if (percent === 80) {
            this.setState({
                color: '#409628',
                percent: percent
            });
            this.tm = setTimeout(this.increase, 10);
            return;
        }
        this.setState({ percent: percent });
        this.tm = setTimeout(this.increase, 10);
    }
    componentWillUnmount() {
        clearTimeout(this.tm);
    }
    render() {
        var gradeClass;
        if (this.state.percent >= 80) gradeClass = 'grade-passed';
        else                          gradeClass = 'grade-failed';
        return (
            <div className="grade-circle">
                <Circle strokeWidth="8" percent={this.state.percent} strokeColor={this.state.color} />
                <span className={gradeClass}>{this.state.percent}%</span>
            </div>
        )
        }
    }
  class ExamQuestion extends Component {
    render() {
        var isCorrectClass;
        var isDisabled = true;
        var correctAnswer = this.props.question.correct_ans;
        var answerOptions = this.props.question.answers.map(answer => {
            isCorrectClass = "";
            if (answer.ans_id === correctAnswer) {
                isCorrectClass = "correctAnswer";
            }
            if ((this.props.userAnswer === answer.ans_id) && (correctAnswer !== answer.ans_id)) {
                isCorrectClass = "incorrectAnswer";
            }
            return(
            <li key={ answer.ans_id } className={isCorrectClass} >
                <label>
                    <input type="radio"
                        value={answer.ans_id}
                        checked={this.props.userAnswer === answer.ans_id}
                        disabled={isDisabled}
                        id={answer.ans_id}
                    />
                    <span>{" "+answer.ans}</span>
                    <br/>
                </label>
            </li>)
        });
      return (
          <div className="question-answer-container">
            <h3>{'Pregunta ' + this.props.questionNum}</h3>
            <p className="question">{this.props.question.question}</p>
            <div className="answer-form">
                <ul className="answers">
                    {answerOptions}
                </ul>
            </div>
          </div>
      )
    }
  }

export default ExamResults;