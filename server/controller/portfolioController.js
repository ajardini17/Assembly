const Sequelize = require('sequelize');
const Model = require('../../database/models/model.js');

module.exports ={
    createPortfolio: (req, res) => {
        Model.Portfolio.create({
            name: req.body.name
        })
        .then(portfolio => {
            res.send(portfolio.dataValues);
        })
    },
    

}

