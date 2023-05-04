const express = require('express');
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("admin");
});

router.get("/projects", (req, res, next) => {
    res.render("admin-projects");
  });



  router.get("/projects/workingOn", (req, res, next) => {
    res.render("admin-workingON");
  });

module.exports = router;
