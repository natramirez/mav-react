import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from './Header.js'
import WelcomePage from './WelcomePage';
import ExamPage from './ExamPage';
import QuizPage from './QuizPage';
import DriversGuidePage from './DriversGuidePage';

class Main extends Component {
  render() {
    return (
        <main>
          <Switch>
            <Route exact path="/" component={WelcomePage} />
            <Route exact path="/examen_completo" component={ExamPage} />
            <Route exact path="/examen_express" component={QuizPage} />
            <Route exact path="/guia_de_manejo" component={DriversGuidePage} />
          </Switch>
        </main>
    );
  }
}
export default Main;
