import React, { useState, useEffect } from 'react';
import { Col, Row, Alert } from 'react-bootstrap';
import facade from '../apiFacade';

function UserInfo() {
  const [user, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [dataFromServer, setDataFromServer] = useState(null);

  //Get user data
  useEffect(() => {
    const user = facade.getUser();
    if (user) {
      setUserData(user);

      facade
        .fetchData('/info/' + user.roles, 'GET')
        .then((data) => setDataFromServer(data.msg))
        .catch((err) => {
          setError(err);
        });
    } else {
      setError('Could not decode user token');
    }
  }, []);

  return (
    <>
      {user ? (
        <Row>
          <Col>
            <h3>Token info:</h3>
            <p>Username: {user.username}</p>
            <p>Roles: {user.roles}</p>
            <p>issuer: {user.issuer}</p>
          </Col>
          <Col>
            <h3>Server response:</h3>
            {dataFromServer}
          </Col>
        </Row>
      ) : (
        <Alert variant="danger">{error}</Alert>
      )}
    </>
  );
}
export default UserInfo;
