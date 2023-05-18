const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Repair = require("../models/Repair.model");
const User = require("../models/User.model");
const Admin = require('../models/Admin.model');

const gKey= process.env.MAP_API;

//CREATE A REQUEST
router.get('/contact', (req, res) => {
  res.render('contact', {gKey});
});

let isRouteRunning = false;

router.post('/contact', async (req, res) => {
  const { name, email, phone, subject, message } = req.body;
  try {
    const admin = await Admin.findOne({ email: "notbatman@batman.not" }); 

    admin.messages.push({ name, email, phone, subject, message });
    await admin.save();

    res.render("contact", { message: 'Form submitted successfully! The Synth Doctor is on it :)' });
  } 
  catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      res.status(500).render("contact", { errorMessage: error.message });
    } else if (error.code === 11000) {
      res.status(500).render("contact", { errorMessage: "Error. Please try again" });
    }
  }
  isRouteRunning = true;
});



module.exports = router;