import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

class TopNav extends Component {
  render() {
    
    return (
    <div className="top-nav">
        <ul className="top-nav-list">
            <li className="active">
              <Link to="/">Inicio</Link>
            </li>
            <li>
              <Link to="/examen_completo">Examen completo</Link>
            </li>
            <li>
              <Link to="/examen_express">Examen express</Link>
            </li>
            <li>
              <Link to="/guia_de_manejo">Guia de manejo</Link>
            </li>
        </ul>
    </div>
    );
  }
}

export default TopNav;
