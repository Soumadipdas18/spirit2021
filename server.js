const express =require('express');
const app =express();
const bodyParser=require('body-parser');
const mongoose = require("mongoose");
const authapi = require("./routes/authapi");
const profileroute = require("./routes/profileroute");
const event_regRoute = require("./routes/event_regRoute");
const iplauction=require("./routes/iplauction");
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const stuff_user = require("./model/user");
const stuff_event = require("./model/events");
const stuff_ipl_auction = require("./model/ipl_auction");
const cors=require("cors");
var session;

mongoose.connect(
  "mongodb+srv://spirit2021:yH7HfOYsISfl1JKz@cluster0.g6tea.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
	useUnifiedTopology: true,
  }
);
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("connection to db established"));

// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;

//session middleware
app.use(sessions({
    secret: "secretkeyrvfmiefmeoofmdgtt",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

//cors
app.use(cors()); 
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(cookieParser());
app.set('view engine', 'ejs');
app.get('/',(req,res)=>{
	//throw new Error('BROKEN');
	session=req.session;
    if(session.userid){
        res.render('index',{logged_in: true});
    }else
    res.render('index',{logged_in: false});
});

app.get('/register',(req,res)=>{
	res.render('register');
	
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/profile", async (req, res) => {
  email = session.userid;
  const user = await stuff_user.model.findOne({ email }).lean();
  res.render("profile",{user: user});
});

app.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

app.get("/events", (req, res) => {
  res.render("events");
});

app.get("/events/event_registration", async (req, res) => {
  email = session.userid;
  const user = await stuff_user.model.findOne({ email }).lean();
  res.render("event_reg",{user: user});
});

app.use("/authapi", authapi);
app.use("/iplauction", iplauction);
app.use("/profile", profileroute);
app.use("/events/event_registration", event_regRoute);
app.listen(process.env.PORT || 3000,function(req,res){
	console.log("Hello Spirit");
});


