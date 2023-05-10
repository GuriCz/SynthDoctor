const Blog = require("../models/Blog.model");
const router = require("express").Router();


router.get("/blog", (req, res) => {
  Blog.find()
    .then((blog) => {
      res.render("blog space/blog.hbs", { blog });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/create-blog", (req, res) => {
  res.render("blog space/create-blog.hbs");
});

router.post("/create-blog", (req, res) => {
  const { author, title, content } = req.body;
  console.log(req.body);
  Blog.create({ author, title, content })
    .then((blog) => {
      res.redirect("/blog");
    })
    .catch((err) => {
      console.log(err);
      res.render("blog space/blog.hbs");
    });
});

router.get("/blog/:id", (req, res) => {
  const postId = req.params.id;
  Blog.findById(postId)
  .then((blog) => {
    res.render("blog space/blog-details", { blog });
  })
  .catch((err) => console.log(err));
});

router.get("/blog/:id/delete", (req, res) => {
  const postId = req.params.id;
  Blog.findByIdAndDelete(postId)
    .then(() => {
      res.redirect("/blog");
    })
    .catch((err) => console.log(err));
});

router.get("/blog/:id/edit", (req, res) => {
  const postId = req.params.id;
    Blog.findById(postId)
    .then((blog) => {
      res.render("blog space/edit-blog", { blog });
    })
    .catch((err) => console.log(err));
});

module.exports = router;