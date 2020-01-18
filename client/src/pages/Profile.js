import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Profile = ({ user }) => {
  return <div></div>;
};

Profile.propTypes = {
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    user: state.auth.user
  };
};
export default connect(mapStateToProps)(Profile);
