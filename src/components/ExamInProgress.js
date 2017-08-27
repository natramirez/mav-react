import React, { Component } from 'react';
import ProgressBar from './ProgressBar';
import axios from 'axios';

class ExamInProgress extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
        this.onOptionSelect = this.onOptionSelect.bind(this);        
        this.onNextQuestion = this.onNextQuestion.bind(this);
        this.onExamFinish = this.onExamFinish.bind(this);
        this.checkAnswer = this.checkAnswer.bind(this);
        this.saveAnswer = this.saveAnswer.bind(this);
        this.getPercentComplete = this.getPercentComplete.bind(this);
        this.createAnswerOptions = this.createAnswerOptions.bind(this);
        this.createAnswerForm = this.createAnswerForm.bind(this);
    }
    getInitialState() {
            this.answers = [];
            this.questions = [];
            return {
                curQuestionNum: 1,
                selectedOption: null,
                isExamFinished: false
            }
    }
    componentWillMount() {
        var serverURL = 'http://localhost:3001/api/questions';
        axios.get(serverURL,{
            params: {
              numQuestions: this.props.numQuestions
            }
          })
        .then(res => {
            console.log('res.data: ' + JSON.stringify(res.data));
            this.questions = res.data;
            this.forceUpdate();
        });
    }
    getPercentComplete() {
        let curQuestionNum = this.state.curQuestionNum;
        let total = this.questions.length;
        if (this.state.isExamFinished) return 100;
        else                          return (curQuestionNum-1)/total * 100;
    }
    checkAnswer(answerId) {
        return answerId === this.questions[this.state.curQuestionNum-1].correct_ans
    }
    onOptionSelect(event) {
        let answerId = Number(event.target.id);
        this.setState({
            selectedOption: answerId
          });
    }
    onNextQuestion(e) {
        e.preventDefault();
        this.saveAnswer();
        this.setState({
            selectedOption: null,
            curQuestionNum: this.state.curQuestionNum + 1,
        });       
    }
    onExamFinish(e) {
        e.preventDefault();        
        this.saveAnswer();
        this.setState({
            isExamFinished: true
        });
        var that = this;
        setTimeout(function() {
            that.props.goToResultsPage(that.questions, that.answers);
        }, 300);
    }
    saveAnswer() {
        if (this.answers.length >= this.state.curQuestionNum) { //assumes that users can go back and change answers (not yet though)
            this.answers[this.state.curQuestionNum-1] = this.state.selectedOption;
        }
        else   this.answers.push(this.state.selectedOption);
    }
    createAnswerForm() {
        var formSubmitFunction;
        var formSubmitText;
        var formSubmitBtn;        
        if (this.questions.length === this.state.curQuestionNum) {
            formSubmitFunction = this.onExamFinish;
            formSubmitText = "Terminar y ver calificación";
        }
        else {
            formSubmitFunction = this.onNextQuestion;
            formSubmitText = "Continuar";
        }
        var answerOptions = this.createAnswerOptions();
        if (this.state.selectedOption) {
            formSubmitBtn = <input id="next-question" type="submit" value={formSubmitText} className="btn btn-lg btn-default cont-btn"/>;
        }
        else formSubmitBtn = null;
        return (
            <form className="answer-form" onSubmit={formSubmitFunction}>
                <div className="answers">{answerOptions}</div>
                {formSubmitBtn}
            </form>
        );
    }
    createAnswerOptions() {
        var isCorrectClass;
        var isCorrectElem;
        var correctAnswer = null;
        var isDisabled = false;
        if (this.state.selectedOption) {
            correctAnswer = this.questions[this.state.curQuestionNum-1].correct_ans;
            isDisabled = true;
        }
        return this.questions[this.state.curQuestionNum-1].answers.map(answer => {
            isCorrectClass = "";
            isCorrectElem = null;
            if (answer.ans_id === correctAnswer) {
                isCorrectClass = "correctAnswer";
                isCorrectElem = <span className="correct-span"> √</span>;
            }
            if ((this.state.selectedOption === answer.ans_id) && (correctAnswer !== answer.ans_id)) {
                isCorrectClass = "incorrectAnswer";
                isCorrectElem = <span className="incorrect-span"> X</span>;
            } 
            return (<li key={ answer.ans_id } className={isCorrectClass} >
                        <input type="radio"
                            value={answer.ans_id}
                            checked={Number(this.state.selectedOption) === answer.ans_id}
                            disabled={isDisabled}
                            onChange={this.onOptionSelect}  
                            id={answer.ans_id}
                        />
                        <span>{" "+answer.ans}<br/></span>{isCorrectElem}
                    </li>)
        });
  }
  render() {
    if (this.questions.length > 0) {
        var answerForm = this.createAnswerForm();
        return (
            <div className="exam-content">
                <ProgressBar percent={this.getPercentComplete()}/>
                <div className="question-answer-container">
                    <h3>Pregunta {this.state.curQuestionNum}</h3>
                    <p className="question">{this.questions[this.state.curQuestionNum-1].question}</p>
                    { answerForm }
                </div>
            </div>
        )
    }
    else {
        return (<div className="loading-msg">Cargando...</div>);
    }
  }
}

export default ExamInProgress;