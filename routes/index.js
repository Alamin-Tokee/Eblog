const router = require("express").Router();
const passport = require("passport");
const User = require("../models/user");

//Show the landing page
router.get("/", (req,res)=>{
    res.render("index");
});

//Show register page

router.get("/register", (req,res)=>{
    res.render("register");
});

//handle sigmup logic
router.post("/register", (req, res)=>{
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, (err, user)=>{
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, ()=>{
            res.redirect("/posts");
        });
    });
});

//show log in form
router.get("/login", (req, res)=>{
    res.render("login");
});


//handle login logic
// ----------> router.post('/login', middleware, callback)
router.post(
    "/login",
    passport.authenticate("local", {
        successRedirect: "/posts",
        failureRedirect: "/login",
    }),
    (req, res)=> {}
);

//logic route
router.get("/logout", (req,res)=>{
    req.logout();
    res.redirect("/posts");
});


//Loggin handler
function isLoggedIn(req, res, next){
    if(req.isAuthenticate()){
        return next();
    }
    res.redirect("/login");
};

module.exports = router;


