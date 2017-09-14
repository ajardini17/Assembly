import React from 'react'
import {Link} from 'react-router-dom'
import {Modal} from 'react-bootstrap'
import axios from 'axios'

export default class LandingPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false
    }
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  openModal(e) {
    this.setState({
      showModal: true
    })
  }

  closeModal(e) {
    this.setState({
      showModal: false
    })
  }

  render() {

    return (

      <div>

        

        <div className="bgimg-1 w3-display-container w3-opacity-min" id="home">
          <div className="w3-display-middle needNoWrap">
            <span className="w3-center w3-padding-large w3-black w3-xlarge w3-wide w3-animate-opacity">WOOLFEY</span>
          </div>
          <Link to='/login'>
            <div className='w3-display-middle needNoWrap'>
              <h3 id='landingBegin' className='w3-center w3-padding-large w3-wide w3-animate-opacity'>BEGIN</h3>
            </div>
          </Link>
        </div>

        
        <div className="w3-content w3-container w3-padding-64" id="about">
          <h3 className="w3-center">CRYPTOCURRENCY TRADE SIMULATOR</h3>
          <p className="w3-center"><em>Practice trading cryptocurrencies utilizing WoolfVision</em></p>
          <p>
            Use our cryptocurrency trading simulator to practice your trades before you spend your actual money. 
            Our simulator uses real time data for all cryptocurrencies, allowing you to perform your trades the same as 
            you would normally. Build your portfolio, experience the leaps and falls of the cryptocurrency market, and practice trading
            before your money is truly on the line. Be the best trader on Woolfey and reach the top of our leaderboards.
            <br /> <br />
            You will also have access to WoolfVision. Using machine learning and sentiment analysis, we have developed a program that can predict the future prices of multiple 
            crypto currencies, including Bitcoin, Ethereum, and Litecoin. Utilizing data from a number of resources, our WoolfVision technology 
            is able to make predictions with up to 99% accuracy.
          </p>
          <div className="w3-row">
            <div className="w3-col m6 w3-center w3-padding-large">
              <img src="/images/chart.png" id='landingSmallChart' className="w3-round w3-image w3-opacity w3-hover-opacity-off" onClick={this.openModal} alt="Photo of Me" width="500" height="333" />
            </div>

            <Modal show={this.state.showModal} bsSize='large' onHide={this.closeModal} restoreFocus={true} >
              <Modal.Body>
                <img src='/images/chart.png' id='modalChart' />
              </Modal.Body>
            </Modal>

            
            <div className="w3-col m6 w3-hide-small w3-padding-large">
              <p>Get historical, real time, and predicted future data.
                <br />
                Build multiple portfolios and practice trading  with six different cryptocurrencies.
              </p>
            </div>
          </div>
          <p className="w3-large w3-center w3-padding-16">Accuracy of predictions:</p>
          <p className="w3-wide"><i className="fa fa-btc"></i>Bitcoin</p>
          <div className="w3-light-grey">
            <div className="w3-container w3-padding-small w3-dark-grey w3-center" style={{width:90 + '%'}}>90%</div>
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
          <h3 className="w3-center">CONTACT US</h3>
          <p className="w3-center"><em></em>
            
          </p>
          <br />
        </div>


      </div>

    )
  }
}