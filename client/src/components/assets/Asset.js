import React, { useState } from 'react';
import { Card, Button, Modal, Form, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

const Asset = ({ asset, updateAsset, deleteAsset }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [add, setAdd] = useState({
    brand: asset.brand,
    model: asset.model,
    year: asset.year,
    plateNumber: asset.plateNumber,
    color: asset.color,
    capacity: asset.capacity,
    picture: null,
    id: asset._id
  });

  const { brand, model, year, plateNumber, color, capacity, picture } = add;

  const onChange = e => setAdd({ ...add, [e.target.name]: e.target.value });
  const onFileChange = e =>
    setAdd({ ...add, [e.target.name]: e.target.files[0] });

  const onSubmit = async e => {
    e.preventDefault();

    const data = new FormData();
    data.append('brand', brand);
    data.append('model', model);
    data.append('year', year);
    data.append('plateNumber', plateNumber);
    data.append('color', color);
    data.append('capacity', capacity);
    data.append('picture', picture);

    await updateAsset(data, add.id);

    window.location.href = '/profile';
  };

  const onDelete = async (e, id) => {
    e.preventDefault();

    await deleteAsset(id);
  };

  return (
    <div className='col-lg-4 col-md-6 col-sm-12 border-0 mb-4'>
      <Card className='profile-asset-size'>
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
              <p>Capacity: {asset.capacity}</p>
              <p>Status: {asset.status}</p>
            </div>
            <div className='col-12'>
              <Button
                className='mr-4'
                variant='primary'
                type='button'
                onClick={handleShow}
              >
                Edit
              </Button>
              <Button
                variant='danger'
                type='button'
                onClick={e => onDelete(e, asset._id)}
              >
                Delete
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            Update <span className='text-primary'>Asset</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className='' onSubmit={onSubmit}>
            <Form.Row>
              <Form.Group as={Col} sm='12' controlId='formGridFirstName'>
                <Form.Label>Brand</Form.Label>
                <Form.Control
                  name='brand'
                  type='text'
                  onChange={onChange}
                  defaultValue={asset.brand}
                  required
                />
              </Form.Group>

              <Form.Group as={Col} sm='12' controlId='formGridLastName'>
                <Form.Label>Model</Form.Label>
                <Form.Control
                  name='model'
                  type='text'
                  onChange={onChange}
                  defaultValue={asset.model}
                  required
                />
              </Form.Group>

              <Form.Group as={Col} sm='12' controlId='formGridFirstName'>
                <Form.Label>Year</Form.Label>
                <Form.Control
                  name='year'
                  type='text'
                  defaultValue={asset.year}
                  onChange={onChange}
                  required
                />
              </Form.Group>

              <Form.Group as={Col} sm='12' controlId='formGridLastName'>
                <Form.Label>Plate Number</Form.Label>
                <Form.Control
                  name='plateNumber'
                  type='text'
                  defaultValue={asset.plateNumber}
                  onChange={onChange}
                  required
                />
              </Form.Group>

              <Form.Group as={Col} sm='12' controlId='formGridFirstName'>
                <Form.Label>Capacity</Form.Label>
                <Form.Control
                  name='capacity'
                  type='text'
                  defaultValue={asset.capacity}
                  onChange={onChange}
                  required
                />
              </Form.Group>

              <Form.Group as={Col} sm='12' controlId='formGridLastName'>
                <Form.Label>Color</Form.Label>
                <Form.Control
                  name='color'
                  type='text'
                  defaultValue={asset.color}
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

            <Form.Row className='text-right'>
              <Button variant='secondary' className='mr-4' onClick={handleClose}>
                Close
              </Button>
              <Button variant='primary' type='submit'>
                Save Changes
              </Button>
            </Form.Row>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

Asset.propTypes = {
  asset: PropTypes.object.isRequired
};

export default Asset;
