import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class WelcomePage extends Component {
  render() {
    return (
        <div className="page-content">
            <h1 className="page-title">Error 404: Página no existe</h1>
            <p className="welcome-lead">Usted intentó accesar una página que no existe. Por favor regrese a la última página que usted accesó.</p>
            {/* <Link to={this.context.history}>Regresar </Link> */}
        </div>
    );
  }
}

export default WelcomePage;
