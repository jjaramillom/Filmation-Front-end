import React from 'react';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import classes from './NavBar.module.scss';
// import logo from '../../../assets/images/Filmation.png';

const NavBar = () => (
  <Navbar className={classes.navBar} variant='dark' fixed='top'>
    <Navbar.Brand href='#home'>
      {/* <img
        src={logo}
        width='100'
        // height='30'
        className='d-inline-block align-top'
        alt='React Bootstrap logo'
      /> */}
    </Navbar.Brand>
    <Nav className='mr-auto'>
      <Nav.Link active href='#home'>
        Home
      </Nav.Link>
      <Nav.Link href='#features'>Features</Nav.Link>
      <Nav.Link href='#pricing'>Pricing</Nav.Link>
    </Nav>
  </Navbar>
);

export default NavBar;
