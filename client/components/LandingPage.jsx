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