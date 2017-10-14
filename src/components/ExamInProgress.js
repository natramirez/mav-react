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
        this.randomizeAnswers = this.randomizeAnswers.bind(this);
        this.getPercentComplete = this.getPercentComplete.bind(this);
        this.createAnswerOptions = this.createAnswerOptions.bind(this);
        this.createAnswerForm = this.createAnswerForm.bind(this);
    }
    getInitialState() {
            this.answers = [];
            this.questions = [];
            return {
                message: "Cargando...",
                curQuestionNum: 1,
                selectedOption: null,
                isExamFinished: false
            }
    }
    componentWillMount() {
        var port = process.env.API_PORT || 3001;
        var host = window.location.hostname;
        // 'https://' + host +
        var serverURL =  '/api/questions';
        axios.get(serverURL,{
            params: {
              numQuestions: this.props.numQuestions
            }
          })
        .then(res => {
            console.log('res.data: ' + JSON.stringify(res.data));
            this.questions = res.data;
            if (res.data.name && res.data.name === "MongoError") {
                this.handleError();
            }
            else {
                this.randomizeAnswers(this.state.curQuestionNum);
                this.setState({message: null});                
            }
        });
    }
    getPercentComplete() {
        let curQuestionNum = this.state.curQuestionNum;
        let total = this.questions.length;
        if (this.state.isExamFinished) return 100;
        else                          return Math.floor((curQuestionNum-1)/total * 100);
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
        this.randomizeAnswers(this.state.curQuestionNum + 1);
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

    randomizeAnswers(questionNum) {
        var index = questionNum - 1;
        var tempAnswers = this.questions[index].answers;
        var numAnswers = tempAnswers.length;
        var orderArray = [];
        for (let i = 0; i < numAnswers; i++) {
            orderArray[i] = i;
        }
        orderArray = this.shuffleArray(orderArray);
        var newAnswers = [];
        // console.log('orderArray after shuffle: ' + orderArray);
        for (let i = 0; i < numAnswers; i++) {
            // console.log('orderArray[' + i +']: ' + orderArray[i]);
            // console.log('this.questions[index].answers[orderArray['+i+']: ' + JSON.stringify(this.questions[index].answers[orderArray[i]]));
            // tempAnswers[i] = this.questions[index].answers[orderArray[i]];
            newAnswers.push(tempAnswers[orderArray[i]]);
        }
        // console.log('newAnswers: ' + JSON.stringify(newAnswers));
        
        this.questions[index].answers = newAnswers;
    }

    shuffleArray(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
    
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
    
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
    
            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
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
        var correctAnswer = null;
        var isDisabled = false;
        if (this.state.selectedOption) {
            correctAnswer = this.questions[this.state.curQuestionNum-1].correct_ans;
            isDisabled = true;
        }
        return this.questions[this.state.curQuestionNum-1].answers.map(answer => {
            isCorrectClass = "";
            if (answer.ans_id === correctAnswer) {
                isCorrectClass = "correctAnswer";
            }
            if ((this.state.selectedOption === answer.ans_id) && (correctAnswer !== answer.ans_id)) {
                isCorrectClass = "incorrectAnswer";
            } 
            return (<li key={ answer.ans_id } className={isCorrectClass} >
                        <label>
                            <input type="radio"
                                value={answer.ans_id}
                                checked={Number(this.state.selectedOption) === answer.ans_id}
                                disabled={isDisabled}
                                onChange={this.onOptionSelect}  
                                id={answer.ans_id}
                            />
                            <span>{" "+answer.ans}</span>
                            <br />
                        </label>
                    </li>)
            });
  }
  handleError() {
      this.setState({message: "Un error ha occurrido. Por favor intentarlo de nuevo mas tarde."});
  }
  render() {
    if (!this.state.message) {
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
        return (<div className="loading-msg">{this.state.message}</div>);
    }
  }
}

export default ExamInProgress;