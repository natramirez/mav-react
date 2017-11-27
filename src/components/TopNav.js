import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import '../App.css';

class TopNav extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
    this.setClass.bind(this);
  }
  getInitialState() {
    return {
      responsiveClass: false
    }
  }
  toggleClassBool() {
    this.setState({responsiveClass: this.state.responsiveClass ? false : true})
  }
  setClass() {
    return (this.state.responsiveClass ?' responsive':'');
  }
  render() {
    return (
    <div className="top-nav">
        <ul className={"top-nav-list" + this.setClass()}>
            <li className='nav-tabs'>
              <NavLink exact to="/">Inicio</NavLink>
            </li>
            <li className='nav-tabs'>
              <NavLink to="/examen_completo">Examen completo</NavLink>
            </li>
            {/* <li className='nav-tabs'>
              <NavLink to="/examen_express">Examen express</NavLink>
            </li> */}
            <li className='nav-tabs'>
              <NavLink to="/guia_de_manejo">Guia de manejo</NavLink>
            </li>
            <li className='nav-icon' onClick={this.toggleClassBool.bind(this)}>
            &#9776;
            </li>
        </ul>
    </div>
    );
  }
}

export default TopNav;
