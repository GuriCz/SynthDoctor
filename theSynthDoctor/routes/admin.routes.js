const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Repair = require("../models/Repair.model");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("admin");
});

router.get("/projects", (req, res, next) => {
  const pending = [];
  const active = [];
  const closed = [];

  Repair.find().then((result) => {
    for (one of result) {
      if (one.status === 0 || one.status == 1 || one.status == 5)
        pending.push(one);
      else if (one.status == 2 || one.status == 3) active.push(one);
      else if (one.status == 4) closed.push(one);
    }
    res.render("admin-projects", { pending, active, closed });
  });
});

router.get("/projects/workingOn", (req, res, next) => {
  res.render("admin-workingON");
});

router.post("/projects/workingOn", async (req, res, next) => {


  if (req.body.newComment) {
    const existingRepair = await Repair.findById(req.body.caseId);
    existingRepair.comments.push(req.body.newComment);
    await existingRepair.save();
  }

  if (req.body.caseIdP) {
    let c = req.body.count;
    let p = req.body.pr;
    p= p.substring(0, p.length-1)
    p=p.replace(',', '.')
    const parsedValue = parseFloat(p);
    let result = p * c;

    const existingRepair = await Repair.findById(req.body.caseIdP);
    const newPart = {
      name: req.body.pn,
      manu: req.body.ma,
      price: req.body.pr,
      count: req.body.count,
      total: result
    };

    existingRepair.componentUsed.push(newPart);
    await existingRepair.save();

    Repair.findById(req.body.caseIdP).then((work) => {
      res.render("admin-workingON", { work });
    });
  }

  if (req.body.caseIdPR) {
    let c = req.body.count;
    let p = req.body.pr;
    p= p.substring(0, p.length-1)
    p=p.replace(',', '.')
    const parsedValue = parseFloat(p);
    let result = p * c;

    const existingRepair = await Repair.findById(req.body.caseIdPR);
    const newPart = {
      name: req.body.pn,
      manu: req.body.ma,
      price: req.body.pr,
      count: req.body.count,
      total: result
    };

    existingRepair.componentRequired.push(newPart);
    await existingRepair.save();

    Repair.findById(req.body.caseIdPR).then((work) => {
      res.render("admin-workingON", { work });
    });
  }

  if (req.body.caseId) {
    Repair.findById(req.body.caseId).then((work) => {
      res.render("admin-workingON", { work });
    });
  }

 
});

module.exports = router;
