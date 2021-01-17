import React, { useState } from 'react';
import { Col, Alert, Form, Modal, Button } from 'react-bootstrap';
import facade from '../../apiFacade';
import { Formik } from 'formik';
import * as yup from 'yup';

function CreateSportTeam(props) {
  const [error, setError] = useState(null);
  const [selectedSport, setSelectedSport] = useState(
    props.selectedSportTeam
      ? props.selectedSportTeam.sport.id
      : props.sports
      ? props.sports[0].id
      : null
  );

  const addSportTeam = (values) => {
    if (props.selectedSportTeam) {
      values.id = props.selectedSportTeam.id;
      const sport = { id: selectedSport };
      values.sport = sport;
    }
    setError(null);

    facade
      .fetchData(
        props.selectedSportTeam
          ? '/sportteams'
          : '/sportteams/sport/' + selectedSport,
        props.selectedSportTeam ? 'put' : 'post',
        values
      )
      .then(() => {
        setError(null);
        props.handleClose(true);
      })
      .catch(async (err) => {
        console.log(err);
        await err;
        if (err.response) {
          setError(err.response.data.message);
        } else {
          setError(
            'Something went wrong while adding sports team, statusCode: ' +
              err.status
          );
        }
      });
  };

  const schema = yup.object().shape({
    teamName: yup.string().required(),
    pricePerYear: yup.number().integer().required(),
    minAge: yup.number().integer().required(),
    maxAge: yup.number().integer().required(),
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
          {props.selectedSportTeam ? 'Update Sports Team' : 'Add Sports Team'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {' '}
        <Formik
          validationSchema={schema}
          onSubmit={addSportTeam}
          initialValues={{
            teamName: props.selectedSportTeam
              ? props.selectedSportTeam.teamName
              : '',
            pricePerYear: props.selectedSportTeam
              ? props.selectedSportTeam.pricePerYear
              : '',
            minAge: props.selectedSportTeam
              ? props.selectedSportTeam.minAge
              : '',
            maxAge: props.selectedSportTeam
              ? props.selectedSportTeam.maxAge
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
                  <Form.Label>Team Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="teamName"
                    value={values.teamName}
                    onChange={handleChange}
                    isValid={touched.teamName && !errors.teamName}
                  />
                  {errors.teamName && errors.teamName}
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Price Per Year</Form.Label>
                  <Form.Control
                    type="text"
                    name="pricePerYear"
                    value={values.pricePerYear}
                    onChange={handleChange}
                    isValid={touched.pricePerYear && !errors.pricePerYear}
                  />
                  {errors.pricePerYear}
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label>Min Age</Form.Label>
                  <Form.Control
                    type="text"
                    name="minAge"
                    value={values.minAge}
                    onChange={handleChange}
                    isValid={touched.minAge && !errors.minAge}
                  />
                  {errors.minAge && errors.minAge}
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Max Age</Form.Label>
                  <Form.Control
                    type="text"
                    name="maxAge"
                    value={values.maxAge}
                    onChange={handleChange}
                    isValid={touched.maxAge && !errors.maxAge}
                  />
                  {errors.maxAge}
                </Form.Group>
              </Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Sport</Form.Label>
                <Form.Control
                  as="select"
                  name="sport"
                  custom
                  value={selectedSport}
                  onChange={(e) => setSelectedSport(e.target.value)}>
                  {props.sports &&
                    props.sports.map((sport) => {
                      return <option value={sport.id}>{sport.name}</option>;
                    })}
                </Form.Control>
              </Form.Group>
              {error && <Alert variant="danger">{error}</Alert>}
              <Button type="submit">
                {' '}
                {props.selectedSportTeam ? 'Update' : 'Add'}
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
export default CreateSportTeam;
