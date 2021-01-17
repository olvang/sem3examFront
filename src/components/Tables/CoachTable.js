import React, { useState, useEffect } from 'react';
import { Col, Alert, Table, Button } from 'react-bootstrap';
import facade from '../../apiFacade';
import ClipLoader from 'react-spinners/ClipLoader';
import CreateCoach from '../Modals/CreateCoach';

function CoachTable(props) {
  const [error, setError] = useState(null);
  const user = facade.getUser();
  const [show, setShow] = useState(false);
  const [selectedCoach, setSelectedCoach] = useState(null);

  const handleClose = (fetch) => {
    if (fetch) {
      getCoaches();
    }
    setSelectedCoach(null);
    setShow(false);
  };

  const getCoaches = () => {
    facade
      .fetchData('/coach', 'get')
      .then((res) => {
        props.setCoaches(res.data);
      })
      .catch((err) => {
        if (err.response) {
          setError(err.response.data.message);
        } else {
          setError(
            'Something went wrong while deleting sport, statusCode: ' +
              err.status
          );
        }
      });
  };

  useEffect(() => {
    getCoaches();
  }, []);

  const deleteCoach = (coachId) => {
    facade
      .fetchData('/coach/' + coachId, 'delete')
      .then(() => {
        getCoaches();
      })
      .catch(async (err) => {
        await err;
        if (err.response) {
          setError(err.response.data.message);
        } else {
          setError(
            'Something went wrong while deleting coach, statusCode: ' +
              err.status
          );
        }
      });
  };

  return (
    <>
      <>
        <CreateCoach
          show={show}
          handleClose={handleClose}
          selectedCoach={selectedCoach}
        />
      </>
      {props.coaches ? (
        <Col>
          {error && <Alert variant="danger">{error}</Alert>}
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                {user && user.roles == 'admin' && (
                  <th>
                    Actions{' '}
                    <Button
                      onClick={() => {
                        setShow(true);
                      }}>
                      Add New
                    </Button>
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {props.coaches &&
                props.coaches.map((coach) => {
                  return (
                    <tr key={coach.id}>
                      <td>{coach.name}</td>
                      <td>{coach.email}</td>
                      <td>{coach.phone}</td>
                      {user && user.roles == 'admin' && (
                        <td>
                          <Button
                            variant="info"
                            onClick={() => {
                              setSelectedCoach(coach);
                              setShow(true);
                            }}>
                            Edit
                          </Button>
                          <Button
                            variant="danger"
                            onClick={() => deleteCoach(coach.id)}>
                            Delete
                          </Button>
                        </td>
                      )}
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </Col>
      ) : (
        <>
          {error ? (
            <Alert variant="danger">{error}</Alert>
          ) : (
            <ClipLoader size={150} color={'#123abc'} loading={true} />
          )}
        </>
      )}
    </>
  );
}
export default CoachTable;
