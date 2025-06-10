const express = require("express");
const router = express.Router();
const User = require("../mpdels/user.js");
const wrapAsync = require ("../utils/wrapAsync");
const passport = require ("passport");

router.get("/signup", (req, res) => {
res.render("users/signup.ejs");

});

router.post(
    "/signup",
     wrapAsync(async(req, res) => {
        try{
            let {username, email, password} = req.body;
            const newUser = new User ({email, username});
            const registeredUser = await User.register(newUser, password);
            console.log(registeredUser);
            req.flash("success", "Welcome")
            res.redirect("/listings");
        
        } catch(e) {
            req.flash("error", e.message);
            res.redirect("/signup");
        }
    })
);

router.get("/login", (req, res) => {
    res.render("users/login.ejs");
});

router.post("/login", passport.authenticate("local",{
    failureRediret: "/login",
    failureflash: true,
}),
    async(req, res) => {
        res.send("welcome to website! You are Logged In..!")
});

module.exports = router;