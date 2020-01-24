import React from 'react';
import { Col } from 'react-bootstrap';

const ProfileData = ({ firstName, lastName, email, user }) => {
  // console.log(user)
  return (
    <Col className="mt-5" xs={12} md={7}>
      <h5 className="ml-60">My Data</h5>
      <p className='ml-50'>
        <span className='text-dark'>First Name: </span>{' '}
        <span className='text-dark font-weight-bold'>{firstName}</span>
      </p>
      <p className='ml-50'>
        <span className='text-dark'>Last Name: </span>{' '}
        <span className='text-dark font-weight-bold'>{lastName}</span>
      </p>
      <p className='ml-50'>
        <span className='text-dark'>Email: </span>{' '}
        <span className='text-dark font-weight-bold'>{email}</span>
      </p>
      {user && user.phone ? (<p className='ml-50'>
        <span className='text-dark'>Phone: </span>{' '}
        <span className='text-dark font-weight-bold'>{user.phone}</span>
      </p>) : ''}
      {user && user.address ? (<p className='ml-50'>
        <span className='text-dark'>Address: </span>{' '}
        <span className='text-dark font-weight-bold'>{user.address}</span>
      </p>) : ''}
      {user && user.city ? (<p className='ml-50'>
        <span className='text-dark'>City: </span>{' '}
        <span className='text-dark font-weight-bold'>{user.city}</span>
      </p>) : ''}
      {user && user.state ? (<p className='ml-50'>
        <span className='text-dark'>State: </span>{' '}
        <span className='text-dark font-weight-bold'>{user.state}</span>
      </p>) : ''}
    </Col>
  );
};

export default ProfileData;
