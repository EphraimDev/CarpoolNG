import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Col, Button, Alert } from 'react-bootstrap';
import { addAsset, setLoading } from '../../actions/assetActions';
import SpinnerJS from '../layout/Spinner';

const AssetForm = ({ loading, addAsset, setLoading, error }) => {
  const [asset, setAsset] = useState({
    brand: '',
    model: '',
    year: '',
    plateNumber: '',
    color: '',
    capacity: '',
    picture: ''
  });

  const { brand, model, year, plateNumber, color, capacity, picture } = asset;

  const onChange = e => setAsset({ ...asset, [e.target.name]: e.target.value });
  const onFileChange = e =>
    setAsset({ ...asset, [e.target.name]: e.target.files[0] });

  const onSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();

    data.append('brand', brand);
    data.append('model', model);
    data.append('year', year);
    data.append('plateNumber', plateNumber);
    data.append('color', color);
    data.append('capacity', capacity);
    data.append('picture', picture);

    await addAsset(data);

    if(!error){
      window.location.href = '/profile';
    } 
  };
  
  return (
    <div>
      <div className='row auth-div'>
        <div className='col-lg-4 col-md-3 col-sm-2'></div>
        {/* <h1>
        Account <span className='text-primary'>Register</span>
      </h1> */}
        <Form className='col-lg-4 col-md-6 col-sm-8' onSubmit={onSubmit}>
          <h1>
            Create <span className='text-primary'>Asset</span>
          </h1>
          {error ? <Alert variant='danger'>{error}</Alert> : ''}
          <Form.Row>
            <Form.Group as={Col} sm='12' controlId='formGridFirstName'>
              <Form.Label>Brand</Form.Label>
              <Form.Control
                name='brand'
                type='text'
                placeholder='Enter brand'
                onChange={onChange}
                required
              />
            </Form.Group>

            <Form.Group as={Col} sm='12' controlId='formGridLastName'>
              <Form.Label>Model</Form.Label>
              <Form.Control
                name='model'
                type='text'
                placeholder='Enter model'
                onChange={onChange}
                required
              />
            </Form.Group>

            <Form.Group as={Col} sm='12' controlId='formGridFirstName'>
              <Form.Label>Year</Form.Label>
              <Form.Control
                name='year'
                type='text'
                placeholder='Enter year'
                onChange={onChange}
                required
              />
            </Form.Group>

            <Form.Group as={Col} sm='12' controlId='formGridLastName'>
              <Form.Label>Plate Number</Form.Label>
              <Form.Control
                name='plateNumber'
                type='text'
                placeholder='Enter plate number'
                onChange={onChange}
                required
              />
            </Form.Group>

            <Form.Group as={Col} sm='12' controlId='formGridFirstName'>
              <Form.Label>Capacity</Form.Label>
              <Form.Control
                name='capacity'
                type='text'
                placeholder='Enter capacity'
                onChange={onChange}
                required
              />
            </Form.Group>

            <Form.Group as={Col} sm='12' controlId='formGridLastName'>
              <Form.Label>Color</Form.Label>
              <Form.Control
                name='color'
                type='text'
                placeholder='Enter model'
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
                required
              />
            </Form.Group>
          </Form.Row>

          {!loading ? (<Button variant='primary' type='submit'>
            Submit
          </Button>) : (<SpinnerJS />)}
          
        </Form>
        <div className='col-lg-4 col-md-3 col-sm-2'></div>
      </div>
    </div>
  );
};

AssetForm.propTypes = {
  error: PropTypes.string,
  addAsset: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  setLoading: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
      error: state.asset.error,
      loading: state.asset.loading
  }
};

export default connect(mapStateToProps, { addAsset, setLoading })(AssetForm);
