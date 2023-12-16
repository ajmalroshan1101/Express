const express = require("express");
const app = express();
const router = express.Router();
const validation = require("../controllers/validation");
let users = [];

let message = ""
app.set("view engine", "ejs");
router.get("/", (req, res) => {
    // res.status(200).render("signup");
    // console.log(req.session);
    if (req.session.user) {
        res.render("home");
    } else {
        res.render("signup");
    }
});

router.post("/sign", validation, (req, res) => {
    const username = req.body.uname;
    const password = req.body.pass;
    const email = req.body.email;

    const checkuser = users.find((e) => {
        return e.email === email;
    });
    if (checkuser) {
        res.redirect("/login");
        // res.render('login', { alertMessage: 'User already exists!' });
    } else {
        let newuser = {
            username: username,
            password: password,
            email: email,
        };
        users.push(newuser);
        // res.render("home");
        // console.log(users);
        req.session.user = {
            username: email,
        };
        res.redirect("/home");
    }
});
router.get("/home", (req, res) => {
    if (req.session.user) {
        res.render("home");
    } else {
        res.redirect("/login");
    }
});
router.get("/login", (req, res) => {
    if (req.session.user) {
        res.render("home");
    } else {
        res.render("login");
    }
});
router.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            res.status(500).send("destory is not working");
        } else {
            res.redirect("login");
        }
    });
});
router.post("/login", (req, res) => {
    const { username, pass } = req.body;
    const email = req.body.email;
    console.log(username);


    console.log(pass);
    const validuser = users.find((e) => {
        return e.username === username && e.password === pass;
    });

    if (validuser) {
        req.session.user = {
            username: email,
        };
        res.redirect("/home");
    } else {

        req.session.message="incorrect username and password"
        res.redirect("/login")
    }
});

module.exports = router;
