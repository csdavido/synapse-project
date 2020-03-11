import React, { Component } from 'react'
import { stack as Menu } from 'react-burger-menu'
import '../css/nav.css'

class Navigation extends React.Component {
  showSettings (event) {
    event.preventDefault();
  }

  render () {
    // NOTE: You also need to provide styles, see https://github.com/negomi/react-burger-menu#styling
    return (
      <Menu right>
        <a id="home" className="menu-item" href="/">Public</a>
        <a id="home" className="menu-item" href="/home">Home</a>        
        <a id="about" className="menu-item" href="/about">About</a>
        <a id="team" className="menu-item" href="/team">Team</a>
        <a id="settings" className="menu-item" href="/settings">Settings</a>
        {/*<a onClick={ this.showSettings } className="menu-item--small" href="">Settings</a>*/}
      </Menu>
    );
  }
}

export default Navigation
