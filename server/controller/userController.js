const Sequelize = require('sequelize');
const express = require('express');
const Model = require('../../database/models/model.js');

const hasher = require('./password.js');


module.exports = {
    addProfile: (req, res) => {
        Model.User.findOne({where: {handle: req.body.handle}})
        .then(response => {
            if(!response){
                hasher.generatePassword(req.body.password, hash => {
                    console.log('hash', hash);
                    let email = req.body.email ? req.body.email : null;
                
                    Model.User.create({handle: req.body.handle, password: hash, email: email})
                    .then(user => res.send(user))
    
                })

            } else {
                res.send('User taken!');
            }
                
        })
        
    },
    login: (req, res) => {
        Model.User.findOne({
            where: {handle: req.query.handle}
        })
        .then(user => {
            if(!user){
                res.send('user doesn\'t exist');
            } else {
                hasher.comparePassword(req.query.password, user.dataValues.password, (reply) => {
                    if(reply){
                        //fetchUserInfo
                        //send user data
                        res.send('logged in');
                    }else {
                        res.send('invalid password');
                    }

                })
            }
        })
    }

}



