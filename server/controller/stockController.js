const Sequelize = require('sequelize');
const express = require('express');
const Model = require('../../database/models/model.js');
const axios = require('axios');

module.exports = {
  getHistoricalData: (req, res) => {
    let current_time = Math.round((new Date()).getTime() / 1000);
    let currency = req.query[0].toUpperCase();
    axios.get(`https://min-api.cryptocompare.com/data/histoday?fsym=${currency}&tsym=USD&aggregate=1&toTs=${current_time}&allData=true`)
    .then(result => {
      let currency = result.data.Data
      let historicalData = []
      for (let i = 0; i < result.data.Data.length; i++) {
        historicalData.push([currency[i].time * 1000, currency[i].close])
      }
      res.send(historicalData)
    })
    .catch(err => console.log(err))
  }
}

