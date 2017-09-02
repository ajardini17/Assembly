import React from 'react'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'
import {Link} from 'react-router-dom';

export default class Navigation extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="navbar">
        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/">Woolfey</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavDropdown eventKey={3} title="Currencies" id="basic-nav-dropdown">
                <MenuItem eventKey={3.1} href="/currency/btc">Bitcoin</MenuItem>
                <MenuItem eventKey={3.2} href="/currency/bch">Bitcoin Cash</MenuItem>
                <MenuItem eventKey={3.3} href="/currency/eth">Ethereum</MenuItem>
                <MenuItem eventKey={3.4} href="/currency/ltc">Litecoin</MenuItem>
                <MenuItem eventKey={3.5} href="/currency/xrp">Ripple</MenuItem>
                <MenuItem eventKey={3.6} href="/currency/xmr">Monero</MenuItem>
                <MenuItem eventKey={3.7} href="/currency/zec">ZCash</MenuItem>
              </NavDropdown>
            </Nav>

            {this.props.loggedIn ?
            
            <Nav pullRight>
              <NavDropdown eventKey={4} title="Profile" id="basic-nav-dropdown">
                <MenuItem eventKey={4.1} href="/">My Portfolios</MenuItem>
                <MenuItem eventKey={4.2} href="/settings">Settings</MenuItem>
                <MenuItem eventKey={4.3} href="/" onClick={this.props.handleLogOut}>Logout</MenuItem>
              </NavDropdown>
            </Nav>

            :

            <Nav pullRight>
              <Navbar.Brand>
                <a href="/login">Log in</a>
              </Navbar.Brand>
            </Nav>
            
            }

          </Navbar.Collapse>
        </Navbar>
      </div>
    )
  }
}