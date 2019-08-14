import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Navbar from './components/Navbar.js';
import PrivateRoute from './components/PrivateRoute.js';
import AnonRoute from './components/AnonRoute.js';

import Home from './containers/Home';
import Signup from './containers/Signup';
import Login from './containers/Login';
import Profile from './containers/Profile';

import AuthProvider from './contexts/auth-context.js';

import './App.scss';
import 'milligram';

class App extends Component {
  render() {
    return (
      <Router>
        <AuthProvider>
          <Navbar />
          <main className="container">
            <Switch>
              <Route path="/" exact component={Home} />
              <AnonRoute path="/signup" component={Signup} />
              <AnonRoute path="/login" component={Login} />
              <PrivateRoute path="/profile" component={Profile} />
            </Switch>
          </main>
        </AuthProvider>
      </Router>
    )
  }
}

export default App;
