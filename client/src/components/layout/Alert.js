import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Alert } from 'react-bootstrap';

const Alert = ({ alert: { msg, type } }) => {
  return (
    <Alert variant={type}>
      {msg}
    </Alert>
  );
};

Alert.propTypes = {
    alert: PropTypes.object.isRequired,
}

// const mapStateToProps = state => {
//     alert: state.alert
// }

export default Alert;
