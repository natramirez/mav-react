import React, { Component } from 'react';
import ProgressBar from './ProgressBar';
import axios from 'axios';

class ExamInProgress extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();

        // this.requestExam = this.requestExam.bind(this);
        this.onOptionChange = this.onOptionChange.bind(this);        
        this.onNextQuestion = this.onNextQuestion.bind(this);
        this.onExamFinish = this.onExamFinish.bind(this);
        this.saveAnswer = this.saveAnswer.bind(this);

        // if (this.state.questions.length === 0) {
        //     this.requestExam(2);
        // }
    }
    getInitialState() {
        console.log('getInitialState');
        
            return {
                questions:[],        
                answers:[],
                curQuestionNum: 1,
                selectedOption: null,
                errorMsg: null
            }
    }
    componentWillMount() {
        console.log('componentWillMount');
        var serverURL = 'http://localhost:3001/api/questions';
        axios.get(serverURL,{
            params: {
              numQuestions: this.props.numQuestions
            }
          })
        .then(res => {
            console.log('res.data: ' + JSON.stringify(res.data));
            this.setState({ 
                questions: res.data,
                answers:[],
                curQuestionNum: 1,
                selectedOption: null,
                errorMsg: null
             });
        });
    }
    getPercentComplete(numComplete, total) {
        return numComplete/total * 100;
    }
    onOptionChange(event) {
        this.setState({
            selectedOption: Number(event.target.id),
            errorMsg: null
          });
    }
    onNextQuestion(e) {
        e.preventDefault();
        if (!this.state.selectedOption) {
            this.setState({ errorMsg:"Por favor seleccione una respuesta antes de continuar." });
        }
        else {
            var updatedAnswers = this.saveAnswer();
            this.setState({
                answers: updatedAnswers,
                selectedOption: null,
                errorMsg: null,
                curQuestionNum: this.state.curQuestionNum + 1,
            });
        }        
    }
    onExamFinish(e) {
        e.preventDefault();        
        if(!this.state.selectedOption) this.setState({ errorMsg:"Por favor seleccione una respuesta antes de continuar." });
        else {
            var updatedAnswers = this.saveAnswer();
            this.setState({
                errorMsg: null,
                curQuestionNum: this.state.curQuestionNum + 1
            })
            var that = this;
            setTimeout(function() {
                that.props.goToResultsPage(that.state.questions, updatedAnswers);
            }, 300);
        }
    }
    saveAnswer() {
        var updatedAnswersArray;
        if (this.state.answers.length >= this.state.curQuestionNum) {
            updatedAnswersArray = this.state.answers;
            updatedAnswersArray[this.state.curQuestionNum-1] = this.state.selectedOption;
        }
        else {
            updatedAnswersArray = this.state.answers.concat(this.state.selectedOption);
        }
        return updatedAnswersArray;
    }

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
    // console.log("updated answers array: " + JSON.stringify(this.state.answers));
    // console.log("questions array: " + JSON.stringify(this.state.questions));
    // console.log("questions length: " + this.state.questions.length);
    // console.log("curQuestionNum: " + this.state.curQuestionNum);    
    
    if (this.state.questions.length > 0) {
        var formSubmitFunction;
        var formSubmitText;
        var questionIndex = this.state.curQuestionNum-1;
        if (this.state.questions.length <= this.state.curQuestionNum) {
            if (this.state.questions.length < this.state.curQuestionNum) {
                questionIndex = this.state.curQuestionNum-2;
            }
            formSubmitFunction = this.onExamFinish;
            formSubmitText = "Terminar y ver calificación";
        }
        else {
            formSubmitFunction = this.onNextQuestion;
            formSubmitText = "Continuar";
        }
        let percentProgress = this.getPercentComplete(this.state.curQuestionNum-1, this.state.questions.length);
        var curQuestion = this.state.questions[questionIndex];        
        let answerList = curQuestion.answers.map(answer => {
            return (<li key={ answer.ans_id }>
                        <input type="radio"
                            value={answer.ans_id}
                            checked={Number(this.state.selectedOption) === answer.ans_id} 
                            onChange={this.onOptionChange} 
                            id={ answer.ans_id }
                        />
                        <span>{" "+answer.ans}<br/></span>
                    </li>)
        });
        
        
        return (
            <div className="exam-content">
                <ProgressBar percent={percentProgress}/>
                <div className="question-answer-container">
                    <h3>Pregunta {questionIndex + 1}</h3>
                    <p className="question">{curQuestion.question}</p>
                    <form className="answer-form" onSubmit={formSubmitFunction}>
                        <div className="answers">{answerList}</div>
                        <input id="next-question" type="submit" value={formSubmitText} className="btn btn-lg btn-default cont-btn"/>
                    </form>
                    <span className="error-msg">{this.state.errorMsg}</span>
                </div>
            </div>
        )
    }
    else {
        console.log('rendering null');
        return (<div className="loading-msg">Cargando...</div>);
    }
  }
}

export default ExamInProgress;