const express = require("express");
const app = express();
const session = require('express-session')

// EXPRESS SESSION INFO

const sessionOptions = {
    secret: "mysupersecretstring",
    resave: false,
    saveUninitialized: true,

};

// storing and using info
app.use(session(sessionOptions));

app.get("/register", (req, res) => {
    let {name= "anonymous"} = req.query;
    req.session.name = name;
    res.redirect("/hello");
    // console.log(req.session);
    // res.send(name);
});

app.get("/hello",(req, res) => {
    res.send(`hello ${req.session.name}`);
});

// app.get ("/reqcount", (req, res) => {
//     if (req.session.count){
//         req.session.count++;
//     } else {
//         req.session.count = 1;
//     }
//     res.send(`you sent a request ${req.session.count} times`)
// });


// app.get("/test", (req, res)=> {
//     res.send("test sucessful");
// })

app.listen(3000, () => {
    console.log("server is listening to 3000");
});