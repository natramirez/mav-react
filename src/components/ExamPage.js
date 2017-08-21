import React, { Component } from 'react';
import { Line } from 'rc-progress';
import axios from 'axios';


class ExamPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questions:[]
        }
        this.startExam = this.startExam.bind(this);
    }

    startExam(numQuestions) {
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
        <div className="page-content">
            <h1 className="page-title">Examen completo: 40 preguntas</h1>
            <p className="welcome-lead">
                <a href='#' onClick={ this.startExam.bind(this, 1) }>Comenzar examen</a>
            </p>
            <Line percent="10" strokeColor="#4286f4" />
            <span>10% completado</span>
            <div className="question-answer-container">
                <h3>Pregunta 5</h3>
                <p className="question">Si se niega a tomar una prueba de concentración de alcohol en la sangre, perderá su licencia de manejo por:</p>
                <form className="answer-form">
                    <div className="answers">
                        <input type="radio" name="answers" id="8"/><span> 90 días<br/></span>
                        <input type="radio" name="answers" id="10"/><span> Al menos 1 año<br/></span>
                        <input type="radio" name="answers" id="7"/><span> 6 meses<br/></span>
                        <input type="radio" name="answers" id="9"/><span> Al menos 2 años<br/></span>
                    </div>
                    <input id="next-question" type="submit" value="Continuar" className="btn btn-lg btn-default cont-btn"/>
                </form>
                <span className="error-msg"></span>
            </div>
        </div>
    );
  }
}

export default ExamPage;