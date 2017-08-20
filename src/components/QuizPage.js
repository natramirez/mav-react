import React, { Component } from 'react';

class QuizPage extends Component {
  render() {
    return (
        <div className="page-content">
            <h1 className="welcome-heading">Examen express</h1>
            <p className="welcome-lead">En esta pagina, usted podra encontrar examenes que le van a ayudar a prepararse <br/>
                para el examen escrito para sacar el permiso de manejo en el estado de Washington.</p>
            <p className="welcome-lead">
                <a href="#" className="btn btn-lg btn-default">Ver un ejemplo</a>
            </p>
        </div>
    );
  }
}

export default QuizPage;
