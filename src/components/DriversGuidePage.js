import React, { Component } from 'react';

class DriversGuidePage extends Component {
  render() {
    return (
        <div className="page-content">
            <h1 className="welcome-heading">Guia de manejo</h1>
            <p className="welcome-lead">
                En esta pagina usted puede encontrar la guia de manejo del Estado de Washington Department of Licensing.
                Es muy importante que estudie cada pagina de esta guia, desde la portada hasta la contraportada, por que las preguntas de los examenes estan totalmente basadas en el contenido de esta guia.</p>
            <object className="drivers-guide-object" width="600" height="800" data="https://www.dol.wa.gov/driverslicense/docs/driverguide-spanish.pdf">
            No se pudo cargar la guia de manejo. Por favor intentelo mas tarde.
            </object>
        </div>
    );
  }
}

export default DriversGuidePage;
