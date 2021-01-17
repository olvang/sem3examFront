import React, { useEffect } from 'react';
import { Col, Row, Container, Button } from 'react-bootstrap';
import facade from '../apiFacade';
import UserInfo from './UserInfo';
import { useHistory } from 'react-router-dom';

function DashBoard() {
  const history = useHistory();

  useEffect(() => {
    const user = facade.getUser();
    if (user) {
      history.push('/dashboard');
    } else {
      history.push('/');
    }
  }, []);

  return (
    <Container>
      <Row>
        <Col>
          <UserInfo />
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
}
export default DashBoard;
