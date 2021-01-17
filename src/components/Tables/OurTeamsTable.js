import React, { useState, useEffect } from 'react';
import { Col, Alert, Table, Button } from 'react-bootstrap';
import facade from '../../apiFacade';
import ClipLoader from 'react-spinners/ClipLoader';
import CreateSportTeam from '../Modals/CreateSportTeam';
import TeamPlayers from '../Modals/TeamPlayers';

function OurTeamsTable(props) {
  const [serverRes, setServerRes] = useState(null);
  const [error, setError] = useState(null);
  const user = facade.getUser();
  const [show, setShow] = useState(false);
  const [showTeamPlayers, setShowTeamPlayers] = useState(false);
  const [selectedSportTeam, setSelectedSportTeam] = useState(null);

  const handleClose = (fetch) => {
    if (fetch) {
      getSportTeams();
    }
    setSelectedSportTeam(null);
    setShow(false);
  };

  const handleTeamClose = () => {
    setShowTeamPlayers(false);
  };

  //Get user data
  useEffect(() => {
    getSportTeams();
  }, []);

  const getSportTeams = () => {
    facade
      .fetchData('/sportteams', 'GET')
      .then((res) => {
        setError(null);
        setServerRes(res.data);
      })
      .catch((err) => {
        if (err.response) {
          setError(err.response.data.message);
        } else {
          setError(
            'Something went wrong while fetiching sport teams, statusCode: ' +
              err.status
          );
        }
      });
  };

  const deleteSportTeam = (sportTeamId) => {
    facade
      .fetchData('/sportteams/' + sportTeamId, 'delete')
      .then(() => {
        getSportTeams();
      })
      .catch(async (err) => {
        await err;
        if (err.response) {
          setError(err.response.data.message);
        } else {
          setError(
            'Something went wrong while deleting sport team, statusCode: ' +
              err.status
          );
        }
      });
  };

  return (
    <>
      {serverRes ? (
        <>
          <>
            {props.sports && (
              <CreateSportTeam
                show={show}
                handleClose={handleClose}
                selectedSportTeam={selectedSportTeam}
                sports={props.sports}
              />
            )}
            {selectedSportTeam && showTeamPlayers && (
              <TeamPlayers
                show={showTeamPlayers}
                handleClose={handleTeamClose}
                selectedSportTeam={selectedSportTeam}
              />
            )}
          </>
          <Col>
            {error && <Alert variant="danger">{error}</Alert>}
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Team Name</th>
                  <th>Price Per Year</th>
                  <th>Min - Max Age</th>
                  <th>Coaches</th>
                  <th>Sport</th>
                  {user && user.roles === 'admin' && (
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
                {serverRes.map((sportTeam) => {
                  return (
                    <tr key={sportTeam.id}>
                      <td>{sportTeam.teamName}</td>
                      <td>{sportTeam.pricePerYear}</td>
                      <td>
                        {sportTeam.minAge} - {sportTeam.maxAge}
                      </td>
                      <td>
                        {sportTeam &&
                          sportTeam.coachList &&
                          sportTeam.coachList.all.length > 0 &&
                          sportTeam.coachList.all.map((coach) => {
                            return coach.name + ', ';
                          })}
                      </td>
                      <td>
                        {sportTeam && sportTeam.sport && sportTeam.sport.name}
                      </td>
                      {user && user.roles === 'admin' && (
                        <td>
                          <Button
                            variant="info"
                            onClick={() => {
                              setSelectedSportTeam(sportTeam);
                              setShow(true);
                            }}>
                            Edit
                          </Button>
                          <Button
                            variant="info"
                            onClick={() => {
                              setSelectedSportTeam(sportTeam);
                              setShowTeamPlayers(true);
                            }}>
                            Players
                          </Button>
                          <Button
                            variant="danger"
                            onClick={() => deleteSportTeam(sportTeam.id)}>
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
        </>
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
export default OurTeamsTable;
