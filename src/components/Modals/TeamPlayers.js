import React, { useState, useEffect } from 'react';
import { Alert, Modal, Button, Table } from 'react-bootstrap';
import facade from '../../apiFacade';

function TeamPlayers(props) {
  const [error, setError] = useState(null);
  const [players, setPlayers] = useState(null);
  const user = facade.getUser();

  useEffect(() => {
    getTeamPlayers();
  }, []);

  const getTeamPlayers = () => {
    facade
      .fetchData(
        '/sportteams/' + props.selectedSportTeam.id + '/players',
        'get'
      )
      .then((res) => {
        setPlayers(res.data);
      })
      .catch((err) => {
        if (err.response) {
          setError(err.response.data.message);
        } else {
          setError(
            'Something went wrong while fetiching players on team, statusCode: '
          );
        }
      });
  };

  return (
    <Modal
      show={props.show}
      onHide={() => {
        setError(null);
        props.handleClose();
      }}
      size={'lg'}>
      <Modal.Header closeButton>
        <Modal.Title>Team Players</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Paid</th>
              <th>Date Paid</th>
            </tr>
          </thead>
          <tbody>
            {players &&
              players.map((memberInfo) => {
                return (
                  <tr key={memberInfo.id}>
                    <td>{memberInfo.player.id}</td>
                    <td>{memberInfo.player.email}</td>
                    <td>{memberInfo.player.phone}</td>
                    <td>{memberInfo.payed ? 'True' : 'False'}</td>
                    <td>{memberInfo.datePayed}</td>
                    {/* {user && user.roles == 'admin' && (
                      <td>
                        <Button variant="danger">Delete</Button>
                      </td>
                    )} */}
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => {
            setError(null);
            props.handleClose();
          }}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
export default TeamPlayers;
