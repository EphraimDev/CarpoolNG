import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SpinnerJS from '../components/layout/Spinner';

import ProfilePicture from '../components/profile/ProfilePicture';
import ProfileData from '../components/profile/ProfileData';
import { Button, Modal, Form, Col } from 'react-bootstrap';
import Asset from '../components/assets/Asset';
import { loadAssets, updateAsset, deleteAsset } from '../actions/assetActions';
import { updateUser, deleteUser } from '../actions/authActions';

const Profile = ({
  loading,
  user,
  loadAssets,
  assets,
  updateAsset,
  deleteAsset,
  updateUser,
  deleteUser
}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    loadAssets();

    // eslint-disable-next-line
  }, []);

  const [profile, setProfile] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    phone: user.phone,
    address: user.address,
    city: user.city,
    state: user.state,
    picture: null
  });

  const { firstName, lastName, phone, address, city, state, picture } = profile;

  const onChange = e =>
    setProfile({ ...profile, [e.target.name]: e.target.value });
  const onFileChange = e =>
    setProfile({ ...profile, [e.target.name]: e.target.files[0] });

  const onSubmit = async e => {
    e.preventDefault();
    
    const data = new FormData();
    data.append('firstName', firstName ? firstName : user.firstName);
    data.append('lastName', lastName ? lastName : user.lastName);
    data.append('phone', phone ? phone : user.phone);
    data.append('address', address ? address : user.address);
    data.append('city', city ? city : user.city);
    data.append('state', state ? state : user.state);
    data.append('picture', picture);

    await updateUser(data);

    handleClose();
  };

  const newAsset = () => {
    window.location.href = '/add/asset';
    return;
  };

  return user.firstName ? (
    <div>
      <div className='row bg-light profile-header'>
        {/* <div className='col-sm-12 col-md-6 col-xl-6 text-center'> */}
        <ProfilePicture
          firstName={user.firstName}
          lastName={user.lastName}
          image={user.picture}
        />
        {/* </div> */}
        {/* <div className='col-sm-12 col-md-6 col-xl-6'> */}
        <ProfileData
          firstName={user.firstName}
          lastName={user.lastName}
          email={user.email}
          user={user}
        />
        <div className='col-12 text-center mt-5 mb-4'>
          <Button
            variant='primary'
            type='button'
            className='mr-2 ml-2'
            onClick={handleShow}
          >
            Update Account
          </Button>
          <Button variant='danger' type='button' onClick={deleteUser}>
            Delete Account
          </Button>
        </div>
        {/* </div> */}
      </div>
      {assets && assets.length > 0 ? (
        <div className='row profile-header text-center mt-5'>
          <h3 className='col-12'>My Assets</h3>
          {assets.map(asset => (
            <Asset
              asset={asset}
              key={asset._id}
              updateAsset={updateAsset}
              deleteAsset={deleteAsset}
            />
          ))}
          <div className='col-12 text-center mt-4'>
            <Button variant='primary' type='button' onClick={newAsset}>
              Add New Asset
            </Button>
          </div>
        </div>
      ) : (
        <div className='col-12 text-center'>
          <Button variant='primary' type='button' onClick={newAsset}>
            Add New Asset
          </Button>
        </div>
      )}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            Update <span className='text-primary'>User</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className='' onSubmit={onSubmit}>
            <Form.Row>
              <Form.Group as={Col} sm='12' controlId='formGridFirstName'>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  name='firstName'
                  type='text'
                  onChange={onChange}
                  defaultValue={user.firstName}
                  required
                />
              </Form.Group>

              <Form.Group as={Col} sm='12' controlId='formGridLastName'>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  name='lastName'
                  type='text'
                  onChange={onChange}
                  defaultValue={user.lastName}
                  required
                />
              </Form.Group>

              <Form.Group as={Col} sm='12' controlId='formGridFirstName'>
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  name='phone'
                  type='text'
                  defaultValue={user.phone}
                  onChange={onChange}
                  required
                />
              </Form.Group>

              <Form.Group as={Col} sm='12' controlId='formGridLastName'>
                <Form.Label>Address</Form.Label>
                <Form.Control
                  name='address'
                  type='text'
                  defaultValue={user.address}
                  onChange={onChange}
                  required
                />
              </Form.Group>

              <Form.Group as={Col} sm='12' controlId='formGridLastName'>
                <Form.Label>City</Form.Label>
                <Form.Control
                  name='city'
                  type='text'
                  defaultValue={user.city}
                  onChange={onChange}
                  required
                />
              </Form.Group>

              <Form.Group as={Col} sm='12' controlId='formGridFirstName'>
                <Form.Label>State</Form.Label>
                <Form.Control
                  name='state'
                  type='text'
                  defaultValue={user.state}
                  onChange={onChange}
                  required
                />
              </Form.Group>

              <Form.Group as={Col} sm='12' controlId='formGridLastName'>
                <Form.Label>Picture</Form.Label>
                <Form.Control
                  name='picture'
                  type='file'
                  onChange={onFileChange}
                />
              </Form.Group>
            </Form.Row>
            {!loading ? (
              <Form.Row className='text-right'>
                <Button
                  variant='secondary'
                  className='mr-4'
                  onClick={handleClose}
                >
                  Close
                </Button>
                <Button variant='primary' type='submit'>
                  Save Changes
                </Button>
              </Form.Row>
            ) : (
              <SpinnerJS />
            )}
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  ) : (
    <SpinnerJS />
  );
};

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  assets: PropTypes.array,
  loadAssets: PropTypes.func.isRequired,
  deleteAsset: PropTypes.func.isRequired,
  updateAsset: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  deleteUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    assets: state.asset.assets,
    loading: state.asset.loading
  };
};
export default connect(mapStateToProps, {
  loadAssets,
  updateAsset,
  deleteAsset,
  updateUser,
  deleteUser
})(Profile);
