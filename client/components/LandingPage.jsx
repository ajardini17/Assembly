import React from 'react'
import {Link} from 'react-router-dom'

export default class LandingPage extends React.Component {
  constructor() {
    super()
  }

  componentDidMount() {
  }

  render() {

    return (

      <div>

        <div className="bgimg-1 w3-display-container w3-opacity-min" id="home">
          <div className="w3-display-middle needNoWrap">
            <span className="w3-center w3-padding-large w3-black w3-xlarge w3-wide w3-animate-opacity">WOOLFEY</span>
          </div>
          <Link to='/simulator'>
            <div className='w3-display-middle needNoWrap'>
              <h3 id='landingBegin' className='w3-center w3-padding-large w3-wide w3-animate-opacity'>Begin</h3>
            </div>
          </Link>
        </div>

        
        <div className="w3-content w3-container w3-padding-64" id="about">
          <h3 className="w3-center">TRADE CRYPTO STUFF</h3>
          <p className="w3-center"><em>I love photography</em></p>
          <p>We have created a fictional "personal" website/blog, and our fictional character is a hobby photographer. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
            qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          <div className="w3-row">
            <div className="w3-col m6 w3-center w3-padding-large">
              <img src="/images/chart.png" id='landingSmallChart' className="w3-round w3-image w3-opacity w3-hover-opacity-off" alt="Photo of Me" width="500" height="333" />
            </div>

            
            <div className="w3-col m6 w3-hide-small w3-padding-large">
              <p>Practice trading bitcoin, ethereum, and other crypto currencies</p>
            </div>
          </div>
          <p className="w3-large w3-center w3-padding-16">Improvement after using our site:</p>
          <p className="w3-wide"><i className="fa fa-camera"></i>Bitcoin</p>
          <div className="w3-light-grey">
            <div className="w3-container w3-padding-small w3-dark-grey w3-center" style={{width:90 + '%'}}>90%</div>
          </div>
          <p className="w3-wide"><i className="fa fa-laptop"></i>Ethereum</p>
          <div className="w3-light-grey">
            <div className="w3-container w3-padding-small w3-dark-grey w3-center" style={{width:85 + '%'}}>85%</div>
          </div>
          <p className="w3-wide"><i className="fa fa-photo"></i>Litecoin</p>
          <div className="w3-light-grey">
            <div className="w3-container w3-padding-small w3-dark-grey w3-center" style={{width:75 + '%'}}>75%</div>
          </div>
        </div>

        <div className="bgimg-2 w3-display-container w3-opacity-min">
          <div className="w3-display-middle">
            <span className="w3-xxlarge w3-text-white w3-wide">MACHINE LEARNING</span>
          </div>
        </div>

        <div className="w3-content w3-container w3-padding-64" id="portfolio">
          <h3 className="w3-center">MY WORK</h3>
          <p className="w3-center"><em>Here are some of my latest lorem work ipsum tipsum.
            <br /> 
            Click on the images to make them bigger</em>
          </p>
          <br />
        </div>

        <div className="bgimg-3 w3-display-container w3-opacity-min">
          <div className="w3-display-middle">
            <span className="w3-xxlarge w3-text-white w3-wide">GET STARTED</span>
          </div>
        </div>

        <div className="w3-content w3-container w3-padding-64" id="contact">
          <h3 className="w3-center">WHERE I WORK</h3>
          <p className="w3-center"><em>I'd love your feedback!</em></p>

          <div className="w3-row w3-padding-32 w3-section">
            <div className="w3-col m4 w3-container">
              <div id="googleMap" className="w3-round-large w3-greyscale" style={{width:100 + '%', height:400 + 'px'}}></div>
            </div>
            <div className="w3-col m8 w3-panel">
              <div className="w3-large w3-margin-bottom">
                <i className="fa fa-map-marker fa-fw w3-hover-text-black w3-xlarge w3-margin-right"></i> Chicago, US<br />
                <i className="fa fa-phone fa-fw w3-hover-text-black w3-xlarge w3-margin-right"></i> Phone: +00 151515<br />
                <i className="fa fa-envelope fa-fw w3-hover-text-black w3-xlarge w3-margin-right"></i> Email: mail@mail.com<br />
              </div>
              <p>Swing by for a cup of <i className="fa fa-coffee"></i>, or leave me a note:</p>
              <form action="/action_page.php" target="_blank">
                <div className="w3-row-padding" style={{margin:0 -16 + 'px' + 8 + 'px' + -16 + 'px'}}>
                  <div className="w3-half">
                    <input className="w3-input w3-border" type="text" placeholder="Name" required name="Name" />
                  </div>
                  <div className="w3-half">
                    <input className="w3-input w3-border" type="text" placeholder="Email" required name="Email" />
                  </div>
                </div>
                <input className="w3-input w3-border" type="text" placeholder="Message" required name="Message" />
                <button className="w3-button w3-black w3-right w3-section" type="submit">
                  <i className="fa fa-paper-plane"></i> SEND MESSAGE
                </button>
              </form>
            </div>
          </div>
        </div>

      </div>

    )
  }
}