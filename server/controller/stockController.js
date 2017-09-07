const Model = require('../../database/models/model.js');
const Redis = require('../../database/redis/redis.js')
const axios = require('axios');

module.exports = {
  getHistoricalData: (req, res) => {
    // Redis.get(`${req.query[0]}:history`, (err, data) => {
    //   res.send(JSON.parse(data));
    // })
    Model.historicalGraphData.findOne({where: {currency: req.query[0]}})
    .then(graph => {
      const reformatted = graph.dataValues.data.map(x => {
        const temp = [];
        temp.push(Number(x[0]));
        temp.push(Number(x[1]))
        return temp;
      })
      res.send(reformatted); 
      console.log(reformatted)
    })
  }
}

