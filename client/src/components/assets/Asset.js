import React from 'react';
import { Card, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const Asset = ({ asset }) => {

  const updateAsset = (e, id) => {
    e.preventDefault();
  };

  const deleteAsset = (e, id) => {
    e.preventDefault();
  };
  
  return (
    <Card className='col-lg-4 col-md-6 col-sm-12 border-0'>
      <Card.Img variant='top' src={asset.picture} />
      <Card.Body className='border'>
        <Card.Title>
          {asset.brand} {asset.model}
        </Card.Title>
        <div className='row'>
          <div className='col-12'>
            <p>Year: {asset.year}</p>
            <p>Plate Number: {asset.plateNumber}</p>
            <p>Color: {asset.color}</p>
            <p>Capacity {asset.capacity}</p>
          </div>
          <div className='col-12'>
            <Button
              className='mr-4'
              variant='primary'
              type='button'
              onClick={e => updateAsset(e, asset._id)}
            >
              Edit
            </Button>
            <Button
              variant='danger'
              type='button'
              onClick={e => deleteAsset(e, asset._id)}
            >
              Delete
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

Asset.propTypes = {
  asset: PropTypes.object.isRequired
};

export default Asset;
