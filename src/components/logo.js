import React, { Component } from 'react'
import logo from '../public/home/logo.png';
import text from '../public/home/text.png';
import '../App.css'

class Logo extends React.Component {
  showSettings (event) {
    event.preventDefault();
  }


  render () {
    return (
      <div>
        <img src={logo} className="App-logo synapse-logo" alt="logo" />
        <div className="synapse-div">
          <img src={text} className="Text-logo synapse-text" alt="logo" />
          <span className="logoBalance">Balance: {this.props.bal}</span>
        </div>
      </div>



    );
  }
}

export default Logo
