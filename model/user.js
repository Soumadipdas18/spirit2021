const mongoose = require("mongoose");
//User schema
const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique:false},
    collegename: { type: String, default: null ,unique:false},
    email: { type: String, required: true, unique: true },
    phno: { type: String, default: null,unique:false },
    password: { type: String, default: null,unique:false },
	//Since our website is not ready we will host a static form for the ipl auction event in the old website
	//and connect it with this database. So when our new website will be put up, we will send mail to the registered users with a random password to         //login into the new website. So I made the storerandompassword field to store a random password for them which can be used later
	storerandompassword:  { type: String, required:false,unique:false },
	discord:  { type: String, required:false,unique:false },
    isVerified: { type: Boolean, default: false },
    provider: { type: String, default: "email" },
  },
  {
    timestamps: true,
  },
);
const model = mongoose.model("UserSchema", UserSchema);
module.exports.model = model;


//Event1 schema
const Event1Schema = new mongoose.Schema(
  {
    item: { type: String, required: true, unique:false},
	user: [{type: mongoose.Schema.Types.ObjectId, ref: 'UserSchema'}],
  });
const Event1 = mongoose.model("Event1", Event1Schema);
module.exports.event1 = Event1;

//IPLAuction Schema
const IPLAuction = new mongoose.Schema(
  {
    teamname: { type: String, required: true, unique: true },
    member1: [UserSchema],
    member2: [UserSchema],
    member3: [UserSchema],
  },
  {
    timestamps: true,
  }
);
const IPLAuctionSchema = mongoose.model("IPLAuctionSchema", IPLAuction);
module.exports.iplauction = IPLAuctionSchema;

//testt