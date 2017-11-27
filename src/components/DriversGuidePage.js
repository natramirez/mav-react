import React, { Component } from 'react';
import guide from '../driver-guide-spanish.pdf';


class DriversGuidePage extends Component {
  render() {
    return (
        <div className="page-content">
            <h1 className="welcome-heading">Guia de manejo</h1>
            <p className="welcome-lead">
                En esta pagina usted puede encontrar la guia de manejo del Estado de Washington Department of Licensing.
                Es muy importante que estudie cada pagina de esta guia, desde la portada hasta la contraportada, por que las preguntas de los examenes estan totalmente basadas en el contenido de esta guia.</p>
            <iframe className="drivers-guide-object" src="http://docs.google.com/gview?url=http://www.dol.wa.gov/driverslicense/docs/driverguide-spanish.pdf&embedded=true" frameBorder="0"></iframe>
        </div>
    );
  }
}

export default DriversGuidePage;
