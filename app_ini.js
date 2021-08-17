const express = require("express");
const mongoose=require("mongoose");
const bodyParser=require("body-parser");
const ejs=require("ejs");
const path=require("path");
const session = require("express-session");

//passport is for password setup
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

const app=express();
app.use(express.static("public"));
app.set('view engine','ejs');
app.use('/views',express.static(path.join(__dirname,'views')));
app.engine('html',require('ejs').renderFile);
app.use(bodyParser.urlencoded({extended:true}))

const sessionStore = new session.MemoryStore;
app.use(session({
    secret: 'ejrfwbacwniugweyvbgukryweuyevbhigcwkeywkeyhvi',
    resave: false,
    saveUninitialized: true,
    store: sessionStore
}));
app.use(passport.initialize());
app.use(passport.session());

const db=require("./db");



const userSchema = new mongoose.Schema({
    UserID:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type: String,
        required : true
    },
    workplace:{
        type: String,
        required : true
    },
    phonenumber:{
        type: String,
    },
    department:{
        type: String,
        required : true
    },
    designation:{
        type: String
    },
    username:{
        type: String,
        required : true,
        unique : true
    },
    save_pass:{
        type: String
        },
    password:{
            type: String
    }
});
var options = {
    errorMessages: {
        MissingPasswordError: 'No password was given',
        AttemptTooSoonError: 'Account is currently locked. Try again later',
        TooManyAttemptsError: 'Account locked due to too many failed login attempts',
        NoSaltValueStoredError: 'Authentication not possible. No salt value stored',
        IncorrectPasswordError: 'Password or username are incorrect',
        IncorrectUsernameError: 'Password or username are incorrect',
        MissingUsernameError: 'No username was given',
        UserExistsError: 'A user with the given username is already registered'
    }
};
userSchema.plugin(passportLocalMongoose, options);
const User = new mongoose.model("User", userSchema);
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());




const Counterschema = new mongoose.Schema({
    counterFor:{
        type:String,
        required : true,
        unique : true
    },
    prefix:{
        type:String,
        required : true,
        unique : true
    },
    count: Number,
    Status: String
});

const Counter = new mongoose.model("counters",Counterschema);

app.get('/',(req,res)=>{
    res.render('kaushik/index.html');
});

app.get('/index.html',(req,res)=>{
        res.render('kaushik/index.html');
});

app.get('/add_centre.html',(req,res)=>{
    res.render('kaushik/add_centre.html');
});

app.get('/add_section.html',(req,res)=>{
    res.render('kaushik/add_section.html');
});

app.get('/centre_list.html',(req,res)=>{
    res.render('kaushik/centre_list.html');
});

app.get('/patient_registration.html',(req,res)=>{
    res.render('kaushik/patient_registration.html');
});


app.listen(7087,function(){
    console.log("Server is on port on 7087");
});