const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Repair = require("../models/Repair.model")

//SIGNUP
router.get('/login', (req, res) => {
  res.render('login');
});



//CREATE A REQUEST
router.get('/contact', (req, res) => {
  res.render('form-request');
});

router.post("/contact", async (req, res) => {
  try {
    const newRequest = req.body;
    await Repair.create(newRequest);
    res.redirect('/');
  } catch (err) {
    console.log(err);
  }
});



module.exports = router;