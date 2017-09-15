import React from 'react'
import {Link} from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

export default class Footer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <footer className="footer2">
        <div className="footer">
            <div className="container">
                <div className="row">
                </div>
            </div>
        </div>
        
        <div className="footer-bottom">
            <div className="container">
                <div className="pull-left"> Copyright © woolfey.com</div>
                <div className="pull-right">
                    <ul>
                        <li><a href="/#portfolio">About</a></li>
                        <li><a href="">Careers</a></li>
                    </ul> 
                </div>
            </div>
        </div>
      </footer>
    )
  }
}