import React from 'react';
import PropTypes from 'prop-types';

const ProfilePicture = ({ firstName, lastName, image }) => {
  const name = `${firstName} ${lastName}`;
  const pp = image ? image : 'https://via.placeholder.com/150';

  return <img className='pp-image col-xl-4 col-md-4 col-sm-12' src={pp} alt={name} />;
};

ProfilePicture.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  image: PropTypes.string,
};

export default ProfilePicture;
