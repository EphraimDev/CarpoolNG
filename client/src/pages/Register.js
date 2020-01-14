import React, { useState } from 'react';
import { Form, Col, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { register } from '../actions/authActions';

const Register = ({ register }) => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const { firstName, lastName, email, password } = user;

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();

    register({
      firstName,
      lastName,
      email,
      password
    });
  };

  return (
    <div className='row'>
      <div className='col-lg-3 col-md-3 col-sm-2'></div>
      {/* <h1>
        Account <span className='text-primary'>Register</span>
      </h1> */}
      <Form className='col-lg-6 col-md-6 col-sm-8' onSubmit={onSubmit}>
        <h1>
          Account <span className='text-primary'>Register</span>
        </h1>
        <Form.Row>
          <Form.Group as={Col} sm='12' controlId='formGridFirstName'>
            <Form.Label>First Name</Form.Label>
            <Form.Control
              name='firstName'
              type='text'
              placeholder='Enter first name'
              onChange={onChange}
              required
            />
          </Form.Group>

          <Form.Group as={Col} sm='12' controlId='formGridLastName'>
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              name='lastName'
              type='text'
              placeholder='Enter last name'
              onChange={onChange}
              required
            />
          </Form.Group>
        </Form.Row>
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
      <div className='col-lg-3 col-md-3 col-sm-2'></div>
    </div>
  );
};

Register.propTypes = {
    register: PropTypes.func.isRequired,
}

export default connect(null, { register })(Register);
