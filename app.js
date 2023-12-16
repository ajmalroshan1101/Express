const express=require('express')
const app=express()
const PORT=4000
const Router=require("./controllers/maincontroller")
const session=require('express-session')
const nocache=require('nocache')
const env=require('dotenv')
env.config()


app.use(session({
    // using secret key from envornment varibale m
    secret:process.env.SESSION_SECRET, 
    resave:false,
    saveUninitialized:true,
    cookie:{
        sameSite:"strict"
    }
}))

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:true}))
app.set("view engine","ejs")
app.use('/controllers', express.static('controllers'));
app.use(express.json())
app.use(nocache())

app.use('/',Router)

app.listen(PORT)