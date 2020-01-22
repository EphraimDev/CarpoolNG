import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import store from './store';
import Navbar from './components/layout/NavBar';
import Home from './pages/Home';
import Register from './pages/Register';
import setAuthToken from './utils/setAuthToken';
import Login from './pages/Login';
import Profile from './pages/Profile';
import PrivateRoute from './components/routing/PrivateRoute';
import Authenticate from './components/routing/Authenticate';

if(localStorage.getItem('x-auth-token')){
  setAuthToken(localStorage.getItem('x-auth-token'));
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Switch>
            <Route exact path='/' component={Home} />
            <Authenticate path='/register' component={Register} />
            <Authenticate path='/login' component={Login} />
            <PrivateRoute exact path='/profile' component={Profile} />
            <Route exact path="*" component={Home} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
