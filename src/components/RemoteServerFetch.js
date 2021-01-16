import React, { useState, useEffect } from 'react';
import { Col, Row, Alert, Image } from 'react-bootstrap';
import facade from '../apiFacade';
import ClipLoader from 'react-spinners/ClipLoader';

function RemoteServerFetch() {
  const [serverRes, setServerRes] = useState(null);
  const [error, setError] = useState(null);

  //Get user data
  useEffect(() => {
    facade
      .fetchData('/info/fetch', 'GET')
      .then((data) => {
        setServerRes(data);
      })
      .catch((err) => {
        setError(
          'Something went wrong while fetching data from remote servers, statusCode: ' +
            err.status
        );
      });
  }, []);

  return (
    <>
      {serverRes && serverRes.chuck ? (
        <Row>
          <Col>
            <h3>Remote Server Fetch Response:</h3>
            <p>
              <b>Chuck:</b> {serverRes.chuck.value}
            </p>
            <p>
              <b>Dad: </b>
              {serverRes.dad.joke}
            </p>
            <p>
              <b> Dog:</b>
              <Image
                src={serverRes.dog.message}
                width="500px"
                height="500px"
                roundedCircle
              />
            </p>
            <p>
              <b> Xkcd:</b> {serverRes.xkcd.alt}
              <Image src={serverRes.xkcd.img} width="500px" height="500px" />
            </p>
            <p>
              <b> ip:</b> {serverRes.ip.ip}
            </p>
          </Col>
        </Row>
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
export default RemoteServerFetch;
