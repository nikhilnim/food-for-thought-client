import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';

function SiteHeader() {
  const [user, setUser] = useContext(UserContext);
  const navigate = useNavigate();
  function handleLogOut() {
    sessionStorage.removeItem("token");
    setUser(null);
    navigate("/");
  }

  return (
    <Navbar bg="light" expand="lg" className="mb-3">
      <Container>
        <Navbar.Brand as={Link} to={"/"}>
          Food for thought
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            <Nav.Link as={Link} to={user ? "/profile" : "/login"}>
              {user ? `My Recipes` : "Login"}
            </Nav.Link>
            {user && (
              <Button variant="danger" size="sm" onClick={handleLogOut}className="align-self-center">
                Logout
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default SiteHeader;
