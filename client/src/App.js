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
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
