import React from 'react'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'
import {Link} from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

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
                <MenuItem eventKey={3.1} href="/currency/btc">Bitcoin &nbsp;&nbsp;btc</MenuItem>
                <MenuItem eventKey={3.2} href="/currency/bch">Bitcoin Cash &nbsp;&nbsp;bch</MenuItem>
                <MenuItem eventKey={3.3} href="/currency/eth">Ethereum &nbsp;&nbsp;eth</MenuItem>
                <MenuItem eventKey={3.4} href="/currency/ltc">Litecoin &nbsp;&nbsp;ltc</MenuItem>
                <MenuItem eventKey={3.5} href="/currency/xrp">Ripple &nbsp;&nbsp;xmr</MenuItem>
                <MenuItem eventKey={3.6} href="/currency/xmr">Monero &nbsp;&nbsp;xrp</MenuItem>
                <MenuItem eventKey={3.7} href="/currency/zec">ZCash &nbsp;&nbsp;zec</MenuItem>
              </NavDropdown>
            </Nav>
         
            <Nav>
            <LinkContainer to='/leaderboard'>
            <NavItem eventKey={3} >Leaderboard</NavItem>
            </LinkContainer>
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