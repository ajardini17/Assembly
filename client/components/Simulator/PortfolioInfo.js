import React from 'react'

export default class PortfolioInfo extends React.Component {
  constructor() {
    super()
    this.state = {
      portfolioValue: 100000,
      cash: 40000,
      annualReturn: .17
    }
  }

  componentDidMount() {
    $.getJSON('https://www.highcharts.com/samples/data/jsonp.php?filename=aapl-c.json&callback=?', function (data) {
      // data is in form of nested array [[timestamp, closing price], [timestamp, closing price]], ... 
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

  render() {

    var highchartStyle = {
      height: '400px',
      maxWidth: '800px',
      midWidth: '310px',
      margin: '100px auto'
    };

    return (
      <div style={{'textAlign':'center', 'marginTop':'50px'}}>
        <p>Portfolio Value: ${this.state.portfolioValue}</p>
        <p>Cash: ${this.state.cash}</p>
        <p>Annual Return: {this.state.annualReturn * 100}%</p>
        <div id="container" style={highchartStyle}></div>
      </div>
    )
  }
}