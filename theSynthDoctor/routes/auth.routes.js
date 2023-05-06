const express = require('express');
const router = express.Router();
const db = require("../db/index.js");
const User = require('../models/User.model');
const bcrypt = require("bcryptjs")
const mongoose = require("mongoose")


const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{7,}$/;


router.get("/create", (req, res, next) => {
    res.render("account-create");
  });
  
  router.post("/create", (req, res, next) => {
    const newUser= req.body
    if (!newUser.username || !newUser.password || !newUser.name) {
        res.render('account-create', { errorMessage: 'All fields are mandatory. Please provide your username, email and password.' });
        return;
      }
    else if(newUser.email != newUser.email2 ){
        res.render('account-create', { errorMessage: 'The emails you provided are not the same, please check again' });
        return;
      }
      else if(newUser.email != newUser.email2 ){
        res.render('account-create', { errorMessage: 'The emails you provided are not the same, please check again' });
        return;
      }
      else if(newUser.password != newUser.password2 ){
        res.render('account-create', { errorMessage: 'The Passwords you provided are not the same, please check again' });
        return;
      }
      else if(!passwordRegex.test(newUser.password) ){
        res.render('account-create', { errorMessage: 'The Passwords should contain at least 1 capital letter, 1 number and be minimum 7 charachters long' });
        return;
      }
      else if(!emailRegex.test(newUser.email)){
        res.render('account-create', { errorMessage: 'The Email you provided is invalid, please check again' });
        return;
      }
      else{
        const pw = bcrypt.hashSync(newUser.password, salt)
        newUser.password = pw
        User.create({name:newUser.name, username: newUser.username, email : newUser.email, password: newUser.password})
        .then( res.render("login"))
        .catch((error) => {
          if (error instanceof mongoose.Error.ValidationError) {
            res.status(500).render('account-create', { errorMessage: error.message });
          } else if (error.code === 11000) {
            res.status(500).render('account-create', {
               errorMessage: 'This username already exists'
            });
          } else {
            next(error);
          }
        })
        res.render("login");
      }
  });

  
  router.get('/login', (req, res) => res.render('login'));


  router.post('/login', (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password ) {
      res.render('login', {
        errorMessage: 'Please enter both, username and password to login.'
      });
      return;
    }
   
    User.findOne({ username })
      .then(user => {
        if (!user) {
          res.render('login', { errorMessage: 'Username is not registered. Try with other username.' });
          return;
        } else if (bcryptjs.compareSync(password, user.password)) {
          req.session.currentUser = user;
          res.redirect('/userProfile');
        } else {
          res.render('login', { errorMessage: 'Incorrect password.' });
        }
      })
      .catch(error => next(error));
  });

  module.exports = router;
