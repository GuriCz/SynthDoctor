const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Repair = require('../models/Repair.model')

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("admin");
});

router.get("/projects", (req, res, next) => {

  Repair.find()
  .then((result) =>{
    for(one of result){
      console.log(one)
    }
  })
    res.render("admin-projects");
    const pending= []
    const active=[]
    const closed=[]

  });



  router.get("/projects/workingOn", (req, res, next) => {
    
    
    res.render("admin-workingON");
  });

  router.post("/projects/workingOn", (req, res, next) => {
    res.render("admin-workingON");

  });


module.exports = router;
