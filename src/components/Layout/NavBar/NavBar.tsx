import React from 'react';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

const NavBar = () => (
  <Navbar bg='main' fixed='top'>
    <Navbar.Brand href='#home'>Filmation</Navbar.Brand>
    <Nav className='mr-auto'>
      <Nav.Link href='#home'>Home</Nav.Link>
      <Nav.Link href='#features'>Features</Nav.Link>
      <Nav.Link href='#pricing'>Pricing</Nav.Link>
    </Nav>
  </Navbar>
);

export default NavBar;
