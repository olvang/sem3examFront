import React, { useState } from 'react';
import { Col, Alert, Form, Modal, Button } from 'react-bootstrap';
import facade from '../../apiFacade';
import { Formik } from 'formik';
import * as yup from 'yup';

function CreateSport(props) {
  const [error, setError] = useState(null);

  const addSport = (values) => {
    if (props.selectedSport) {
      values.id = props.selectedSport.id;
    }
    facade
      .fetchData('/sports', props.selectedSport ? 'put' : 'post', values)
      .then(() => {
        setError(null);
        props.handleClose(true);
      })
      .catch(async (err) => {
        await err;
        if (err.response) {
          setError(err.response.data.message);
        } else {
          setError(
            'Something went wrong while adding sport, statusCode: ' + err.status
          );
        }
      });
  };

  const schema = yup.object().shape({
    name: yup.string().required(),
    description: yup.string().required(),
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
          {props.selectedSport ? 'Update Sport' : 'Add Sport'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {' '}
        <Formik
          validationSchema={schema}
          onSubmit={addSport}
          initialValues={{
            name: props.selectedSport ? props.selectedSport.name : '',
            description: props.selectedSport
              ? props.selectedSport.description
              : '',
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
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                    isValid={touched.description && !errors.description}
                  />
                  {errors.description}
                </Form.Group>
              </Form.Row>
              {error && <Alert variant="danger">{error}</Alert>}
              <Button type="submit">
                {' '}
                {props.selectedSport ? 'Update' : 'Add'}
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
export default CreateSport;
