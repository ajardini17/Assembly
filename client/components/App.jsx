import React from 'react'
import {
  Route, 
  BrowserRouter as Router
} from 'react-router-dom'
import LandingPage from './LandingPage.jsx'
import StockSimulator from './StockSimulator.jsx'

export default class App extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (

      <Router>

        <div>
          <Route exact path='/' render={() => <LandingPage />} />
          <Route path='/simulator' render={() => <StockSimulator />} />
        </div>

      </Router>

    )
  }
}