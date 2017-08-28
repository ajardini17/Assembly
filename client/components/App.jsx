import React from 'react'
import {
  Route, 
  BrowserRouter as Router
} from 'react-router-dom'
import LandingPage from './LandingPage.jsx'
import axios from 'axios'
import PortfolioPage from './Simulator/PortfolioPage.js'
import CurrInfo from './CurrInfo.jsx'


export default class App extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (

      <Router>

        <div>
          <Route exact path='/' render={() => <LandingPage />} />
          <Route path='/simulator' render={() => <PortfolioPage />} />
          <Route path='/currency/*' render={() => <CurrInfo />} />
        </div>

      </Router>

    )
  }
}