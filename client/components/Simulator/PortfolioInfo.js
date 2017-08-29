import React from 'react'
import axios from 'axios'

export default class PortfolioInfo extends React.Component {
  constructor() {
    super()
    this.state = {
      portfolioValue: 0,
      cash: 0,
      annualReturn: .17,
      portfolioID: decodeURI(window.location.pathname.slice(11)),
      portfolioName: ''
    }
  }

  componentDidMount() {
    //this.handleFetchData()
    $.getJSON('https://www.highcharts.com/samples/data/jsonp.php?filename=aapl-c.json&callback=?', function (data) {
      // let dummyData = [
      //   [1283299200000,35.76],
      //   [1283385600000,36.02],
      //   [1283472000000,36.97]
      // ]

      // Create the chart
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
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      portfolioValue: nextProps.portfolioValue,
      cash: nextProps.cash,
      portfolioName: nextProps.portfolioName
    })
  }

  render() {

    var highchartStyle = {
      height: '400px',
      maxWidth: '800px',
      midWidth: '310px',
      margin: '100px auto'
    };

    return (
      <div style={{'textAlign':'center', 'marginTop':'50px'}}>
        <h2>{this.state.portfolioName}</h2>
        <p>Portfolio Value: ${this.state.portfolioValue}</p>
        <p>Cash: ${this.state.cash}</p>
        <p>Annual Return: {this.state.annualReturn * 100}%</p>
        <div id="container" style={highchartStyle}></div>
      </div>
    )
  }
}