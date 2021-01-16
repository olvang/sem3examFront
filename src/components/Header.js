import { NavLink } from 'react-router-dom';
import { Container, Nav } from 'react-bootstrap';

function Header(props) {
  return (
    <Container>
      <Nav>
        <Nav.Item>
          <NavLink to="/" className="nav-link">
            Home
          </NavLink>
        </Nav.Item>
        {props.loggedIn && (
          <Nav.Item>
            <NavLink to="/dashboard" className="nav-link">
              Dashboard
            </NavLink>
          </Nav.Item>
        )}
      </Nav>
    </Container>
  );
}
export default Header;
