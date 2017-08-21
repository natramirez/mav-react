import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import ExamBegin from './ExamBegin';
import ExamInProgress from './ExamInProgress';
import ExamResults from './ExamResults';



class ExamPage extends Component {
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
            <Switch>
                <Route exact path={this.props.match.path} component={ExamBegin} />
                <Route exact path={this.props.match.path + '/en_proceso'} component={ExamInProgress} />
                <Route path={`${this.props.match.path}/resultados`} component={ExamResults} />
            </Switch>
        </div>
    );
  }
}

export default ExamPage;