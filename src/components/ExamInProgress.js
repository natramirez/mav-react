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
    // createAnswerForm() {

    // }
    // createAnswerOptions() {

    // }

    // Page Title
    // exam-content
        // Progress bar
        // question-answer-container
            // Question number
            // Question text
            // answer-form
                // Answer choices list
                // Continue button
            // Error message div
  render() {
    if (this.questions.length > 0) {
        var formSubmitFunction;
        var formSubmitText;
        if (this.questions.length <= this.state.curQuestionNum) {
            formSubmitFunction = this.onExamFinish;
            formSubmitText = "Terminar y ver calificación";
        }
        else {
            formSubmitFunction = this.onNextQuestion;
            formSubmitText = "Continuar";
        }
        var answerForm;
        if (this.state.selectedOption) {
            let correctAnswer = this.questions[this.state.curQuestionNum-1].correct_ans;
            let answerList = this.questions[this.state.curQuestionNum-1].answers.map(answer => {
                var isCorrectClass;
                var isCorrectElem;
                if (answer.ans_id === correctAnswer) {
                    isCorrectClass = "correctAnswer";
                    isCorrectElem = <span> √</span>;
                }
                if ((this.state.selectedOption === answer.ans_id) && (correctAnswer !== answer.ans_id)) {
                    isCorrectClass = "incorrectAnswer";
                    isCorrectElem = <span> X</span>;
                } 
                return (<li key={ answer.ans_id } className={isCorrectClass} >
                            <input type="radio"
                                value={answer.ans_id}
                                checked={Number(this.state.selectedOption) === answer.ans_id}
                                disabled={true} 
                                id={ answer.ans_id }
                            />
                            <span>{" "+answer.ans}<br/></span>{isCorrectElem}
                        </li>)
            });
            answerForm = (<form className="answer-form" onSubmit={formSubmitFunction}>
                            <div className="answers">{answerList}</div>
                            <input id="next-question" type="submit" value={formSubmitText} className="btn btn-lg btn-default cont-btn"/>
                        </form>);
        }
        else {
            let answerList = this.questions[this.state.curQuestionNum-1].answers.map(answer => {
                return (<li key={ answer.ans_id }>
                            <input type="radio"
                                value={answer.ans_id}
                                checked={Number(this.state.selectedOption) === answer.ans_id} 
                                onChange={this.onOptionSelect} 
                                id={ answer.ans_id }
                            />
                            <span>{" "+answer.ans}<br/></span>
                        </li>)
            });
            answerForm = (<form className="answer-form" onSubmit={formSubmitFunction}>
                            <div className="answers">{answerList}</div>
                        </form>);
        }  
        
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