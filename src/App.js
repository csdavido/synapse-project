import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navigation from './components/nav.js'
import Settings from './pages/settings.js';
import Logo from './components/logo.js'

import Public from './pages/pub.js';
import Home from './pages/home.js';
import About from './pages/about.js';
import Team from './pages/team.js';
//import Error from './pages/Error';
//import Navigation from './components/Navigation';

class App extends Component {
  render() {
    return (
       <BrowserRouter>
        <div>
          <Navigation/>
            <Switch>
             <Route path="/" component={Public} exact/>
             <Route path="/settings" component={Settings} exact/>
             <Route path="/home" component={Home} exact/>
             <Route path="/about" component={About} exact/>
             <Route path="/team" component={Team} exact/>
             {/*
            //<Route component={Error}/>
            */}
            
           </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
