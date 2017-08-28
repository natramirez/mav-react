import React, { Component } from 'react';
import logo from '../mav-logo.png';
import '../App.css';
import TopNav from './TopNav.js'

class Header extends Component {
  render() {
    return (
      <header>
        <div className="logo">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
         <TopNav/> 
      </header>
    );
  }
}

export default Header;
