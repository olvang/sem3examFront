import React, { useState } from 'react';
import { Col, Alert, Form, Modal, Button } from 'react-bootstrap';
import facade from '../../apiFacade';
import { Formik } from 'formik';
import * as yup from 'yup';

function CreatePlayer(props) {
  const [error, setError] = useState(null);

  const addPlayer = (values) => {
    if (props.selectedPlayer) {
      values.id = props.selectedPlayer.id;
    }

    facade
      .fetchData('/player', props.selectedPlayer ? 'put' : 'post', values)
      .then(() => {
        setError(null);
        props.handleClose(true);
      })
      .catch(async (err) => {
        await err;
        if (err.response) {
          setError(err.response.data.message);
        } else {
          setError('Something went wrong while adding player');
        }
      });
  };

  const schema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    phone: yup.string().required(),
    age: yup.number().integer().required(),
  });

  return (
    <Modal
      show={props.show}
      onHide={() => {
        setError(null);
        props.handleClose();
      }}>
      <Modal.Header closeButton>
        <Modal.Title>
          {props.selectedCoach ? 'Update Player' : 'Add Player'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {' '}
        <Formik
          validationSchema={schema}
          onSubmit={addPlayer}
          initialValues={{
            name: props.selectedPlayer ? props.selectedPlayer.name : '',
            email: props.selectedPlayer ? props.selectedPlayer.email : '',
            phone: props.selectedPlayer ? props.selectedPlayer.phone : '',
            age: props.selectedPlayer ? props.selectedPlayer.age : '',
          }}>
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            touched,
            isValid,
            errors,
          }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    isValid={touched.name && !errors.name}
                  />
                  {errors.name && errors.name}
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="text"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    isValid={touched.email && !errors.email}
                  />
                  {errors.email}
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="text"
                    name="phone"
                    value={values.phone}
                    onChange={handleChange}
                    isValid={touched.phone && !errors.phone}
                  />
                  {errors.phone && errors.phone}
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Age</Form.Label>
                  <Form.Control
                    type="text"
                    name="age"
                    value={values.age}
                    onChange={handleChange}
                    isValid={touched.age && !errors.age}
                  />
                  {errors.age && errors.age}
                </Form.Group>
              </Form.Row>
              {error && <Alert variant="danger">{error}</Alert>}
              <Button type="submit">
                {' '}
                {props.selectedPlayer ? 'Update' : 'Add'}
              </Button>
            </Form>
          )}
        </Formik>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => {
            setError(null);
            props.handleClose();
          }}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
export default CreatePlayer;
