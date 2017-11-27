import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class WelcomePage extends Component {
  render() {
    return (
        <div className="page-content">
            <h1 className="page-title">Bienvenidos a Mujer al Volante.</h1>
            <p className="welcome-lead">En esta página web, usted podra encontrar examenes que le van a ayudar a prepararse <br/>
                para el examen escrito para sacar el permiso de manejo en el estado de Washington.</p>
            <Link to={'/examen_completo/en_proceso'}>COMENZAR A PRACTICAR</Link>
        </div>
    );
  }
}

export default WelcomePage;
