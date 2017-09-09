const Model = require('../../database/models/model.js');
const Redis = require('../../database/redis/redis.js')
const axios = require('axios');

module.exports = {
  getHistoricalData: (req, res) => {
    Model.historicalGraphData.findOne({where: {currency: req.query[0]}})
    .then(graph => {
      const reformatted = graph.dataValues.data.map(x => {
        const temp = [];
        temp.push(Number(x[0]));
        temp.push(Number(x[1]))
        return temp;
      })
      res.send(reformatted); 
    })
  },
  getPredictionData: (req, res) => {
    Model.Prediction.findOne({where: {currency: req.query[0]}})
    .then(response => {
      let data = JSON.parse(response)
      res.send(data);
    })
  }
}

