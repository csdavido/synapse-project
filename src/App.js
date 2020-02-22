import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navigation from './components/nav.js'

import Public from './pages/pub.js';
//import Profile from './pages/profile.js';
//import Public from './pages/public.js';
//import Settings from './pages/settings.js';
//import About from './pages/about.js';
//import Contact from './pages/contact.js';
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
             {/*
             //<Route path="/home" component={Home}/>
             //<Route path="/profile" component={Profile}/>
             //<Route path="/about" component={About} exact/>
             //<Route path="/settings" component={Settings} exact/>
            //<Route component={Error}/>
            */}
           </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
