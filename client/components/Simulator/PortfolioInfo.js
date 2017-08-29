import React from 'react'
import axios from 'axios'

export default class PortfolioInfo extends React.Component {
  constructor() {
    super()
    this.state = {
      portfolioValue: 0,
      cash: 40000,
      annualReturn: .17,
      portfolioID: decodeURI(window.location.pathname.slice(11)),
      portfolioName: ''
    }
    this.handleFetchData = this.handleFetchData.bind(this)
    this.calculatePortfolioValue = this.calculatePortfolioValue.bind(this)
  }

  componentDidMount() {
    this.handleFetchData()
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

  handleFetchData(){
    let token = localStorage.getItem('token')
    axios.get('/api/getUserData', {headers: {authorization:token}})
    .then(reply => this.setState({
      cash: reply.data[this.state.portfolioID].balance,
      portfolioName: reply.data[this.state.portfolioID].name
    }, () => {this.calculatePortfolioValue(reply.data[this.state.portfolioID].stocks)}))
    .catch(err => console.log(err, 'error'))
  }

  calculatePortfolioValue(currencyArr) {
    let tempVal = 0
    let count = 0
    for (let i = 0; i < currencyArr.length; i++) {
      axios.get('/api/coinQuery', {params: currencyArr[i].ticker})
        .then(reply => {
          let price = parseFloat(reply.data.last_price).toFixed(2)
          price *= currencyArr[i].shares
          tempVal += price
          count++
          if (count === currencyArr.length) {
            let newValue = tempVal + this.state.cash
            this.setState({
              portfolioValue: newValue
            })
          }
        })
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