const express = require("express");
const router = express.Router();
const models = require("../models");

router.use(function userAuth (req, res, next) {
    if (!req.session.loggedIn){
        res.redirect("/login");
    }
    next();
});

router.get("/", (req, res) => {

    models.Post.findAll({include: 'author'}).then(results => {
        res.render("home", {posts: results});
    });
});

router.post("/post", (req, res) => {
    models.Post.build({
        body: req.body.body,
        authorid: req.session.user.id
    }).save().then(task => {
        res.redirect("/");
    });
});

module.exports = router;

 
