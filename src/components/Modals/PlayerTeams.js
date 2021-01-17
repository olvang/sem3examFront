import React, { useState, useEffect } from 'react';
import { Alert, Modal, Button, Table } from 'react-bootstrap';
import facade from '../../apiFacade';

function PlayerTeams(props) {
  const [error, setError] = useState(null);
  const [teams, setTeams] = useState(null);
  const user = facade.getUser();

  useEffect(() => {
    getPlayerTeams();
  }, []);

  const getPlayerTeams = () => {
    facade
      .fetchData('/player/' + props.selectedPlayer.id + '/team', 'get')
      .then((res) => {
        setTeams(res.data);
      })
      .catch((err) => {
        if (err.response) {
          setError(err.response.data.message);
        } else {
          setError('Something went wrong while fetiching teams for player');
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
        <Modal.Title>Player Teams</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Team Name</th>
              <th>Price Per Year</th>
              <th>Paid</th>
              <th>Date Paid</th>
            </tr>
          </thead>
          <tbody>
            {teams &&
              teams.map((memberInfo) => {
                return (
                  <tr key={memberInfo.id}>
                    <td>{memberInfo.sportTeam.teamName}</td>
                    <td>{memberInfo.sportTeam.pricePerYear}</td>
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
export default PlayerTeams;
