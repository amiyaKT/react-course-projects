import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';

export default class Header extends Component {
  render() {
    return (
      <Navbar bg='dark' variant='dark'>
        <Navbar.Brand>Github Searcher</Navbar.Brand>
        <Nav>
          {this.props.idToken ? (
            <Nav.Link href='#' onClick={this.props.onLogout}>
              Logout
            </Nav.Link>
          ) : (
            <Nav.Link href='#' onClick={this.props.onLogin}>
              Login
            </Nav.Link>
          )}
        </Nav>
      </Navbar>
    );
  }
}
