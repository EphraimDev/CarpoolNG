import React, { useEffect } from 'react';
import { connect } from 'react-redux';
// import { Redirect } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { loadUser, logOutAuth } from '../../actions/authActions';

const NavBar = ({
  isAuthenticated,
  user: { firstName, lastName },
  loadUser,
  logOutAuth
}) => {
  const logOut = async e => {
    e.preventDefault();

    await logOutAuth();
  };
  const authLinks = (
    <Nav className='ml-auto'>
      <Nav.Link href='/profile'>
        {firstName} {lastName}
      </Nav.Link>
      <Nav.Link href='#!' onClick={evt => logOut(evt)}>
        Sign Out
      </Nav.Link>
    </Nav>
  );

  const guestLinks = (
    <Nav className='ml-auto'>
      <Nav.Link href='/register'>Register</Nav.Link>
      <Nav.Link href='/login'>Login</Nav.Link>
    </Nav>
  );

  useEffect(() => {
    loadUser();

    // eslint-disable-next-line
  }, []);

  return (
    <Navbar bg='light' expand='lg'>
      <Navbar.Brand href='/'>CarpoolNG</Navbar.Brand>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='ml-auto'>
          {isAuthenticated ? authLinks : guestLinks}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

NavBar.propTypes = {
  isAuthenticated: PropTypes.bool,
  user: PropTypes.object,
  loadUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
});

export default connect(mapStateToProps, { loadUser, logOutAuth })(NavBar);
