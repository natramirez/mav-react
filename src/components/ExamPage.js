import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';

import ExamBegin from './ExamBegin';
import ExamInProgress from './ExamInProgress';
import ExamResults from './ExamResults';


class ExamPage extends Component {
    constructor(props) {
        super(props);
        this.goToResultsPage = this.goToResultsPage.bind(this);
        this.questions = [];
        this.userAnswers = [];
    }
    goToResultsPage(questionsList, userAnswersList) {
        this.questions = questionsList;
        this.userAnswers = userAnswersList;
        this.props.history.push(this.props.match.path + '/resultados');
    }
    render() {
        return (
            <div className="page-content">
                <h1 className="page-title">Examen completo: 40 preguntas</h1>
                <Switch>
                    <Route exact path={this.props.match.path} component={ExamBegin} />
                    <Route exact path={this.props.match.path + '/en_proceso'} render={() => <ExamInProgress numQuestions={40} goToResultsPage={this.goToResultsPage}/>} />
                    <Route exact path={this.props.match.path + '/resultados'} render={() => <ExamResults questions={this.questions} userAnswers={this.userAnswers}/>} />
                </Switch>
            </div>
        );
    }
}

export default withRouter(ExamPage);