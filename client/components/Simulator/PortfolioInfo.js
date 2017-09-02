import React from 'react'
import axios from 'axios'

export default class PortfolioInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      portfolioValue: 0,
      cash: 0,
      annualReturn: .01,
      portfolioID: decodeURI(window.location.pathname.slice(11)),
      portfolioName: '',
      history: []
    }
    this.createGraph = this.createGraph.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      portfolioValue: nextProps.portfolioValue,
      cash: nextProps.cash,
      portfolioName: nextProps.portfolioName,
      annualReturn: nextProps.annualReturn,
      history: nextProps.history
    }, () => this.createGraph(this.state.history))
  }

  createGraph(data) {
    if (this.state.history) {
      Highcharts.stockChart('container', {
        rangeSelector: { 
          selected: 1 
        },
        title: { 
          text: 'Portfolio Performance' 
        },
        series: [{
          name: 'Value',
          data: data,
          tooltip: {
            valueDecimals: 2
          }
        }]
      });
    }
  }

  render() {

    var highchartStyle = {
      height: '400px',
      maxWidth: '800px',
      midWidth: '310px',
      margin: '100px auto'
    };

    return (
      <div style={{'textAlign':'center', 'marginTop':'100px'}}>
        <h2>{this.state.portfolioName}</h2>
        <p>Portfolio Value: ${this.state.portfolioValue}</p>
        <p>Cash: ${this.state.cash}</p>
        <p>Annual Return: {(this.state.annualReturn * 100).toFixed(2)}%</p>
        <div id="container" style={highchartStyle}></div>
      </div>
    )
  }
}