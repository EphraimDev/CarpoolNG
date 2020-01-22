import React from 'react';

const ProfileData = ({ firstName, lastName, email }) => {
  return (
    <div className="mt-5 ml-4">
      <h5 className="ml-4">My Data</h5>
      <p>
        <span className='text-dark'>First Name: </span>{' '}
        <span className='text-dark font-weight-bold'>{firstName}</span>
      </p>
      <p>
        <span className='text-dark'>Last Name: </span>{' '}
        <span className='text-dark font-weight-bold'>{lastName}</span>
      </p>
      <p>
        <span className='text-dark'>Email: </span>{' '}
        <span className='text-dark font-weight-bold'>{email}</span>
      </p>
    </div>
  );
};

export default ProfileData;
