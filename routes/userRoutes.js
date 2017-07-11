const express = require("express");
const router = express.Router();
const models = require("../models");

router.use(function userAuth (req, res, next) {
    if (!req.session.loggedIn){
        return res.redirect("/login");
    }
    return next();
});

router.get("/", (req, res) => {
    console.log(req.session.user);
    models.Post.findAll({
        include:[
            {model: models.User, as: 'author'},
            {model: models.Like, as: 'Likes', include: [
                {model: models.User, as: 'user'}
            ]}
        ],
        order: [
            ['updatedAt', 'DESC']
        ]
    }).then(results => {
        results = results.map((e,i,a)=>{
            if(e.authorid == req.session.user.id) {
                e.canDelete = true;
            }
            return e;
        });
        return res.render("home", {user: req.session.user, posts: results});
    });
});

router.post("/delete/:id/:authorid", (req, res) => {
    if(req.params.authorid == req.session.user.id) {
        models.Post.find({
            where: {
                id: req.params.id
            }
        }).then(post => {
            console.log("I FOUND: ", post);
            return post.destroy();
        }).then(task => {
            return res.redirect("/");
        });
    }
    else {
        res.redirect("/");
    }
});

router.post("/post", (req, res) => {
    models.Post.build({
        body: req.body.body,
        authorid: req.session.user.id
    }).save().then(task => {
        res.redirect("/");
    }).catch(err=>{
      res.send(err);
    });
});

router.post("/like/:postid", (req, res) => {
    models.Like.build({
        userid: req.session.user.id,
        postid: req.params.postid
    }).save().then(task => {
        res.redirect("/");
    });
});

module.exports = router;

 
