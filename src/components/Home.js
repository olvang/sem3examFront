import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Login from './Login';
import { useHistory } from 'react-router-dom';

function Home(props) {
  return (
    <>
      <Container>
        <Col className="text-center">
          <h1>Group π</h1>
        </Col>
        <Row>
          <Col>
            <h1>Welcome</h1>
            <h2>How to get started with this project:</h2>
            <ol>
              <li>Run 'npm install' to install dependencies</li>
              <li>Run 'npm start' to begin local server</li>
              <li>Change the server URL in /src/settings.js</li>
              <li>
                To add a new page, add it to the Switch in App.js, and the
                header.jsx component
                <ul>
                  <li>
                    Make sure the 'to' attribute in Header matches the 'path'
                    attribute in App
                  </li>
                </ul>
              </li>
            </ol>
          </Col>
          {!props.loggedIn && (
            <Col sm="4">
              <Login setLoggedIn={props.setLoggedIn} />
            </Col>
          )}
        </Row>
      </Container>
    </>
  );
}
export default Home;
