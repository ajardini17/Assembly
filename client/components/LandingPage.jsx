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
          <h3 className="w3-center">FUTURE SIGHT</h3>
          <p className="w3-center"><em>Make trades before anyone else</em></p>
          <p>Using machine learning and sentiment analysis, we have developed a program that can predict the future prices of multiple 
            crypto currencies, including Bitcoin, Ethereum, and Litecoin. Utilizing data from a number of resources, our FutureSight technology 
            is able to make predictions with up to 99% accuracy.
          </p>
          <div className="w3-row">
            <div className="w3-col m6 w3-center w3-padding-large">
              <img src="/images/chart.png" id='landingSmallChart' className="w3-round w3-image w3-opacity w3-hover-opacity-off" alt="Photo of Me" width="500" height="333" />
            </div>

            
            <div className="w3-col m6 w3-hide-small w3-padding-large">
              <p>Get historical, real time, and predicted future data</p>
            </div>
          </div>
          <p className="w3-large w3-center w3-padding-16">Accuracy of predictions:</p>
          <p className="w3-wide"><i className="fa fa-btc"></i>Bitcoin</p>
          <div className="w3-light-grey">
            <div className="w3-container w3-padding-small w3-dark-grey w3-center" style={{width:90 + '%'}}>90%</div>
          </div>
          <p className="w3-wide"><i className="fa fa-etsy"></i>Ethereum</p>
          <div className="w3-light-grey">
            <div className="w3-container w3-padding-small w3-dark-grey w3-center" style={{width:88 + '%'}}>88%</div>
          </div>
          <p className="w3-wide"><i className="fa fa-usd"></i>Litecoin</p>
          <div className="w3-light-grey">
            <div className="w3-container w3-padding-small w3-dark-grey w3-center" style={{width:90 + '%'}}>90%</div>
          </div>
        </div>

        <div className="bgimg-2 w3-display-container w3-opacity-min">
          <div className="w3-display-middle">
            <span className="w3-xxlarge w3-text-white w3-wide">CRYPTO TRADER</span>
          </div>
        </div>

        <div className="w3-content w3-container w3-padding-64" id="portfolio">
          <h3 className="w3-center">MAKE MOVES</h3>
          <p className="w3-center"><em>...without risking your money</em>
            <br /> 
              Use our crypto-currency trading simulator to practice your trades before you spend your actual money. 
              Our simulator uses real time data for all crypto-currencies, allowing you to perform your trades the same as 
              you would normally. You also have access to our FutureSight technology, giving you the edge in your trades. 
              Be the best trader on Woolfey and reach the top of our leaderboards.
          </p>
          <br />
        </div>

        <div className="bgimg-3 w3-display-container w3-opacity-min">
          <div className="w3-display-middle">
            <span className="w3-xxlarge w3-text-white w3-wide">WOOLFEY</span>
          </div>
        </div>

        <div className="w3-content w3-container w3-padding-64" id="contact">
          <h3 className="w3-center">Contact Us</h3>
          <p className="w3-center"><em>We love your feedback!</em></p>

          <div className="w3-row w3-padding-32 w3-section">
            <div className="w3-col m4 w3-container w3-center">
              <div id="googleMap" className="w3-round-large w3-greyscale" style={{width:100 + '%', height:400 + 'px'}}></div>
            </div>
            <div className="w3-col m8 w3-panel">
              <div className="w3-large w3-margin-bottom">
                <i className="fa fa-map-marker fa-fw w3-hover-text-black w3-xlarge w3-margin-right"></i> Los Angeles, CA<br />
                <i className="fa fa-phone fa-fw w3-hover-text-black w3-xlarge w3-margin-right"></i> Phone: +00 151515<br />
                <i className="fa fa-envelope fa-fw w3-hover-text-black w3-xlarge w3-margin-right"></i> Email: contact@woolfey.com<br />
              </div>
              <p>Feel free to call or send us a message</p>
            </div>
          </div>
        </div>

        <div className="row" id="vwoolf">
          <div className='col-xs-4 col-xs-offset-4 text-center'>
            <img src='./images/favicon-96x96.png' />
          </div>
        </div>

      </div>

    )
  }
}