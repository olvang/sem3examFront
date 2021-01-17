import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Login from './Login';
import SportTable from './Tables/SportsTable';
import OurTeamsTable from './Tables/OurTeamsTable';
import CoachTable from './Tables/CoachTable';
import PlayerTable from './Tables/PlayerTable';

function Home(props) {
  const [sports, setSports] = useState(null);
  const [coaches, setCoaches] = useState(null);
  const [players, setPlayers] = useState(null);

  return (
    <>
      <Container>
        <Col className="text-center">
          <h1>Sport Club</h1>
        </Col>
        <Row>
          <Col>
            <h1>Our Teams</h1>
            <OurTeamsTable sports={sports} />

            <h1>Sports</h1>
            <SportTable
              setSports={setSports}
              sports={sports}
              setCoaches={setCoaches}
              coaches={coaches}
            />
            {props.loggedIn && (
              <>
                <h1>Coaches</h1>
                <CoachTable coaches={coaches} setCoaches={setCoaches} />

                <h1>Players</h1>
                <PlayerTable players={players} setPlayers={setPlayers} />
              </>
            )}
          </Col>
          {!props.loggedIn && (
            <>
              <Col sm="4">
                <Login setLoggedIn={props.setLoggedIn} />
              </Col>
            </>
          )}
        </Row>
      </Container>
    </>
  );
}
export default Home;
