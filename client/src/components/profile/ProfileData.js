import React from 'react';
import { Col } from 'react-bootstrap';

const ProfileData = ({ firstName, lastName, email }) => {
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
    </Col>
  );
};

export default ProfileData;
