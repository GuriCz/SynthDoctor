const express = require('express');
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/services", (req, res, next) => {
  res.render("services");
});

router.get("/services-details", (req, res, next) => {
  res.render("services-details");
});

module.exports = router;
