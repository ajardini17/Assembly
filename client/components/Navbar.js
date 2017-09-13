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
                <MenuItem eventKey={3.1} href="/currency/btc">Bitcoin &nbsp;&nbsp;btc &nbsp;&nbsp;<img src='/images/wolfHead.png' className='woolfVision' /> </MenuItem>
                <MenuItem eventKey={3.2} href="/currency/bch">Bitcoin Cash &nbsp;&nbsp;bch</MenuItem>
                <MenuItem eventKey={3.3} href="/currency/eth">Ethereum &nbsp;&nbsp;eth</MenuItem>
                <MenuItem eventKey={3.4} href="/currency/ltc">Litecoin &nbsp;&nbsp;ltc &nbsp;&nbsp;<img src='/images/wolfHead.png' className='woolfVision' /></MenuItem>
                <MenuItem eventKey={3.5} href="/currency/xrp">Ripple &nbsp;&nbsp;xrp</MenuItem>
                <MenuItem eventKey={3.6} href="/currency/xmr">Monero &nbsp;&nbsp;xmr</MenuItem>
              </NavDropdown>
            </Nav>
         
            <Nav>
            <LinkContainer to='/leaderboard'>
            <NavItem eventKey={3} >Leaderboard</NavItem>
            </LinkContainer>
          </Nav>
          

            {this.props.loggedIn ?
            
            <Nav pullRight>
              <NavDropdown eventKey={5} title="Profile" id="basic-nav-dropdown">
                <MenuItem eventKey={5.1} href="/">My Portfolios</MenuItem>
                <MenuItem eventKey={5.2} href="/" onClick={this.props.handleLogOut}>Logout</MenuItem>
              </NavDropdown>
            </Nav>

            :

            <Nav pullRight>
              <Navbar.Brand>
                <a href="/login">Log in</a>
              </Navbar.Brand>
            </Nav>
            
            }
            {this.props.handleDelete ?

          <Nav pullRight onDoubleClick ={this.props.handleDelete}>
            
            <NavItem eventKey={4} className='deleteButton'>Delete</NavItem>
            
          </Nav>
          :
          null}

          </Navbar.Collapse>
        </Navbar>
      </div>
    )
  }
}