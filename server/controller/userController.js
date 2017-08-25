const Sequelize = require('sequelize');
const express = require('express');
const Model = require('../../database/models/model.js');

const hasher = require('./password.js');

module.exports = {
    addProfile: (req, res) => {

        hasher.generatePassword(req.body.password, (hash) => {
            Model.User.findOne({
                where: {}
            })
        })
    },
    login: (req, res) => {
        Model.User.findOne({
            where: {email: req.query.email}
        })
        .then(user => {
            if(!user){
                res.send('user doesn\'t exist');
            } else {
                res.send('user exists');
            }
            //hasher.comparePassword()
        })
    }

}



