const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
//const Repair = mongoose.model('Repair');

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("admin");
});

router.get("/projects", (req, res, next) => {
    res.render("admin-projects");
    const pending= []
    const active=[]
    const closed=[]

  });



  router.get("/projects/workingOn", (req, res, next) => {
    res.render("admin-workingON");
  });

module.exports = router;
