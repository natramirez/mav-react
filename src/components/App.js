import React, { Component } from 'react';
import '../App.css';

import Header from './Header.js'
import Main from './Main.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <Main/>
        <footer>
          My copyright message.
        </footer>
      </div>

    );
  }
}

export default App;
