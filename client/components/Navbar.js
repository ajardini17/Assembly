import React from 'react'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'

export default class Navigation extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
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
            <Nav pullRight>
              <NavItem eventKey={1} href="#">Settings</NavItem>
              <NavItem eventKey={2} href="#" onClick={this.props.handleLogOut}>Logout</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    )
  }
}