import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import * as HiIcons from 'react-icons/hi';

function LinksBar() {
  return (
    <Navbar bg='light' expand='lg'>
      <Container>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            <NavDropdown title={<HiIcons.HiLink />} id='basic-nav-hiicons'>
              <p>No Links!</p>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default LinksBar;
