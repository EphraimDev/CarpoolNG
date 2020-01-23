import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SpinnerJS from '../components/layout/Spinner';

import ProfilePicture from '../components/profile/ProfilePicture';
import ProfileData from '../components/profile/ProfileData';
import { Button } from 'react-bootstrap';
import Asset from '../components/assets/Asset';
import { loadAssets, updateAsset, deleteAsset } from '../actions/assetActions';

const Profile = ({ user, loadAssets, assets, updateAsset, deleteAsset }) => {
  useEffect(() => {
    loadAssets();

    // eslint-disable-next-line
  }, []);

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
          />
          <div className='col-12 text-center mt-5 mb-4'>
            <Button variant='primary' type='button' className='mr-2 ml-2'>
              Update Account
            </Button>
            <Button variant='danger' type='button'>
              Delete Account
            </Button>
          </div>
        {/* </div> */}
      </div>
      {assets && assets.length > 0 ? (
        <div className='row profile-header text-center mt-5'>
          <h3 className='col-12'>My Assets</h3>
          {assets.map(asset => (
            <Asset asset={asset} key={asset._id} updateAsset={updateAsset} deleteAsset={deleteAsset} />
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
};

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    assets: state.asset.assets
  };
};
export default connect(mapStateToProps, { loadAssets, updateAsset, deleteAsset })(Profile);
