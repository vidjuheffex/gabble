const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const mustacheExpress = require('mustache-express');
const port = process.env.port || 3000;
const bodyParser = require('body-parser');
const models = require('./models');
const path = require('path');

const userRouter = require('./routes/userRoutes');

const app = express();

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '\\views');

app.use(express.static("public"));

app.use(session({
  secret: 'sage is bomb',
  cookie:{
    
    
    maxAge: 900000
  }
}));

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req,res) => { 
  res.redirect("home");
});

app.use("/home", userRouter);

// app.get("/home", checkAuth, (req,res) => {
//     res.render("home", {});
// })

app.get("/login" , (req,res) => {
  res.render("login", {});
});

app.get("/logout", (req,res) =>{
  req.session.destroy();
  res.redirect("/");
});

app.post("/login" , (req,res) => {
  models.User.findOne({
    where: {       
      username: req.body.username
    }
  }).then( user => {
    if (user != null && req.body.password == user.password){
      req.session.user = user;
      req.session.loggedIn = true;
      res.redirect("/home");
    }
    else {
      res.redirect("/login");
    }
  });
});

app.get("/signup", (req,res) => {
  res.render("signup", {});
});

app.post("/signup", (req,res) => {
  models.User.build({
    username: req.body.username,
    password: req.body.password
  }).save().then( task => {
    return res.redirect("/login");
  } );
});

app.listen(port, ()=> console.log(`Listening on port ${port}.`));

