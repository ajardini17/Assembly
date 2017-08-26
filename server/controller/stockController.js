const Sequelize = require('sequelize');
const express = require('express');
const Model = require('../../database/models/model.js');
const axios = require('axios');

module.exports = {
    coinQuery: (req, res) => {
        
        axios.get(`https://api.bitfinex.com/v1/pubticker/${req.query[0]}usd`)
            .then(result => {
              res.send(result.data)
            })
            .catch(err => {
              console.log('error in getting info from server side :: ', err)
            })
    }

}