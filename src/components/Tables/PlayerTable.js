import React, { useState, useEffect } from 'react';
import { Col, Alert, Table, Button } from 'react-bootstrap';
import facade from '../../apiFacade';
import ClipLoader from 'react-spinners/ClipLoader';
import CreatePlayer from '../Modals/CreatePlayer';
import PlayerTeams from '../Modals/PlayerTeams';
import { get } from 'jquery';

function PlayerTable(props) {
  const [error, setError] = useState(null);
  const user = facade.getUser();
  const [show, setShow] = useState(false);
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const handleClose = (fetch) => {
    if (fetch) {
      getPlayers();
    }
    setSelectedPlayer(null);
    setShow(false);
  };

  const handleTeamClose = () => {
    setSelectedPlayer(null);
    setShowTeamModal(false);
  };

  const getPlayers = () => {
    facade
      .fetchData('/player', 'get')
      .then((res) => {
        props.setPlayers(res.data);
      })
      .catch((err) => {
        if (err.response) {
          setError(err.response.data.message);
        } else {
          setError('Something went wrong while featching players');
        }
      });
  };

  //Get user data
  useEffect(() => {
    getPlayers();
  }, []);

  const deletePlayer = (playerId) => {
    facade
      .fetchData('/player/' + playerId, 'delete')
      .then(() => {
        getPlayers();
      })
      .catch(async (err) => {
        await err;
        if (err.response) {
          setError(err.response.data.message);
        } else {
          setError('Something went wrong while deleting player');
        }
      });
  };

  return (
    <>
      <>
        <CreatePlayer
          show={show}
          handleClose={handleClose}
          selectedPlayer={selectedPlayer}
        />
        {showTeamModal && selectedPlayer && (
          <PlayerTeams
            show={showTeamModal}
            handleClose={handleTeamClose}
            selectedPlayer={selectedPlayer}
          />
        )}
      </>
      {props.players ? (
        <Col>
          {error && <Alert variant="danger">{error}</Alert>}
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Age</th>
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
              {props.players &&
                props.players.map((player) => {
                  return (
                    <tr key={player.id}>
                      <td>{player.name}</td>
                      <td>{player.email}</td>
                      <td>{player.phone}</td>
                      <td>{player.age}</td>
                      {user && user.roles == 'admin' && (
                        <td>
                          <Button
                            variant="info"
                            onClick={() => {
                              setSelectedPlayer(player);
                              setShow(true);
                            }}>
                            Edit
                          </Button>
                          <Button
                            variant="info"
                            onClick={() => {
                              setSelectedPlayer(player);
                              setShowTeamModal(true);
                            }}>
                            Teams
                          </Button>
                          <Button
                            variant="danger"
                            onClick={() => deletePlayer(player.id)}>
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
export default PlayerTable;
