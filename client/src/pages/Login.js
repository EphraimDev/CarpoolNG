import React, { useState } from 'react';
import { Form, Col, Button, Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../actions/authActions';

const Login = ({ login, error }) => {
  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const { email, password } = user;

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();

    await login({
      email,
      password
    });
  };

  return (
    <div className='row auth-div'>
      <div className='col-lg-4 col-md-3 col-sm-2'></div>
      {/* <h1>
        Account <span className='text-primary'>Register</span>
      </h1> */}
      <Form className='col-lg-4 col-md-6 col-sm-8' onSubmit={onSubmit}>
        <h1>
          Login <span className='text-primary'>Account</span>
        </h1>
        {error ? <Alert variant='danger'>{error}</Alert> : ''}
        <Form.Row>
          <Form.Group as={Col} sm='12' controlId='formGridEmail'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              name='email'
              type='email'
              placeholder='Enter email'
              onChange={onChange}
              required
            />
          </Form.Group>

          <Form.Group as={Col} sm='12' controlId='formGridPassword'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              name='password'
              type='password'
              placeholder='Password'
              onChange={onChange}
              required
            />
          </Form.Group>
        </Form.Row>

        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </Form>
      <div className='col-lg-4 col-md-3 col-sm-2'></div>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  error: state.auth.error
});

export default connect(mapStateToProps, { login })(Login);
