import React, { useState, useEffect } from 'react';
import { Col, Alert, Table, Button } from 'react-bootstrap';
import facade from '../../apiFacade';
import ClipLoader from 'react-spinners/ClipLoader';
import CreateSport from '../Modals/CreateSport';

function Sport(props) {
  const [error, setError] = useState(null);
  const user = facade.getUser();
  const [show, setShow] = useState(false);
  const [selectedSport, setSelectedSport] = useState(null);

  const handleClose = (fetch) => {
    if (fetch) {
      getSports();
    }
    setSelectedSport(null);
    setShow(false);
  };

  const getSports = () => {
    facade
      .fetchData('/sports', 'get')
      .then((res) => {
        props.setSports(res.data);
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

  //Get user data
  useEffect(() => {
    getSports();
  }, []);

  const deleteSport = (sportId) => {
    facade
      .fetchData('/sports/' + sportId, 'delete')
      .then(() => {
        getSports();
      })
      .catch(async (err) => {
        await err;
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

  return (
    <>
      <>
        <CreateSport
          show={show}
          handleClose={handleClose}
          selectedSport={selectedSport}
        />
      </>
      {props.sports ? (
        <Col>
          {error && <Alert variant="danger">{error}</Alert>}
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
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
              {props.sports &&
                props.sports.map((sport) => {
                  return (
                    <tr key={sport.id}>
                      <td>{sport.name}</td>
                      <td>{sport.description}</td>
                      {user && user.roles == 'admin' && (
                        <td>
                          <Button
                            variant="info"
                            onClick={() => {
                              setSelectedSport(sport);
                              setShow(true);
                            }}>
                            Edit
                          </Button>
                          <Button
                            variant="danger"
                            onClick={() => deleteSport(sport.id)}>
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
export default Sport;
