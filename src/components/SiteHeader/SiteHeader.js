import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import { UserContext } from "../../context/UserContext";
import { useContext } from 'react'
function SiteHeader() {
  const [user, setUser] = useContext(UserContext);
  return (
    <Navbar bg="light" expand="lg" className='mb-3'>
      <Container>
        <Navbar.Brand as={Link} to={"/"}>Food for thought</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            <Nav.Link as={Link} to={user ? '/profile' : '/login'}>{user ? 'Profile' : 'Login'}</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default SiteHeader;