import React, { useState } from 'react';
import { Col, Alert, Form, Modal, Button } from 'react-bootstrap';
import facade from '../../apiFacade';
import { Formik } from 'formik';
import * as yup from 'yup';

function CreateCoach(props) {
  const [error, setError] = useState(null);

  const addCoach = (values) => {
    if (props.selectedCoach) {
      values.id = props.selectedCoach.id;
    }

    facade
      .fetchData('/coach', props.selectedCoach ? 'put' : 'post', values)
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
            'Something went wrong while adding coach, statusCode: ' + err.status
          );
        }
      });
  };

  const schema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    phone: yup.string().required(),
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
          {props.selectedCoach ? 'Update Coach' : 'Add Coach'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {' '}
        <Formik
          validationSchema={schema}
          onSubmit={addCoach}
          initialValues={{
            name: props.selectedCoach ? props.selectedCoach.name : '',
            email: props.selectedCoach ? props.selectedCoach.email : '',
            phone: props.selectedCoach ? props.selectedCoach.phone : '',
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
              </Form.Row>
              {error && <Alert variant="danger">{error}</Alert>}
              <Button type="submit">
                {' '}
                {props.selectedCoach ? 'Update' : 'Add'}
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
export default CreateCoach;
