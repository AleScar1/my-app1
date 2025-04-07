import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { ThemeContext } from '../App';

const NavbarComponente = ({ searchQuery, handleSearch }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <Navbar
      bg={theme === 'dark' ? 'dark' : 'light'}
      variant={theme === 'dark' ? 'dark' : 'light'}
      expand="lg"
    >
      <Navbar.Brand href="#home">Book Store</Navbar.Brand>
      <Nav className="mr-auto" style={{ marginRight: '30px' }}>
        <Nav.Link as={Link} to="/">Home</Nav.Link>
        <Nav.Link as={Link} to="/about">About</Nav.Link>
        <Nav.Link as={Link} to="/browse">Browse</Nav.Link>
      </Nav>

      <Form className="d-flex ml-auto" style={{ maxWidth: '400px' }}>
        <FormControl
          type="text"
          placeholder="Search"
          className="mr-sm-2"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <Button variant="outline-success" style={{ marginRight: '30px' }}>
          Search
        </Button>
      </Form>

      <Button variant="outline-secondary" className="ms-2" onClick={toggleTheme}>
        Toggle Theme
      </Button>
    </Navbar>
  );
};

export default NavbarComponente;

