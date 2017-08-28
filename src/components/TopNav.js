import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import '../App.css';

class TopNav extends Component {
  render() {
    return (
    <div className="top-nav">
        <ul className="top-nav-list">
            <li className='nav-tabs'>
              <NavLink exact to="/">Inicio</NavLink>
            </li>
            <li className='nav-tabs'>
              <NavLink to="/examen_completo">Examen completo</NavLink>
            </li>
            <li className='nav-tabs'>
              <NavLink to="/examen_express">Examen express</NavLink>
            </li>
            <li className='nav-tabs'>
              <NavLink to="/guia_de_manejo">Guia de manejo</NavLink>
            </li>
        </ul>
    </div>
    );
  }
}

export default TopNav;
