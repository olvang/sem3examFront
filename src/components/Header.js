import { NavLink, useHistory } from 'react-router-dom';
import { Container, Nav, Button } from 'react-bootstrap';
import facade from '../apiFacade';

function Header(props) {
  const history = useHistory();

  const logout = () => {
    facade.logout();
    props.setLoggedIn(false);
    history.push('/');
  };

  return (
    <Container>
      <Nav>
        <Nav.Item>
          <NavLink to="/" className="nav-link">
            Home
          </NavLink>
        </Nav.Item>
        {props.loggedIn && (
          <>
            <Nav.Item>
              <NavLink to="/dashboard" className="nav-link">
                Dashboard
              </NavLink>
            </Nav.Item>
            <Button variant="primary" onClick={() => logout()}>
              Logout
            </Button>
          </>
        )}
      </Nav>
    </Container>
  );
}
export default Header;
