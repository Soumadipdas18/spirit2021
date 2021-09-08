const express = require("express");
const app = express.Router();
const bodyParser=require('body-parser');
const stuff = require("../model/user");

var urlencodedParser = bodyParser.urlencoded({ extended : false });


app.post("/post/:id", urlencodedParser ,async(req, res) => {
	

	var newEvent1 = stuff.event1();

	newEvent1.item = req.body.item;
	newEvent1.user.push(req.params.id);
		
	newEvent1.save(function(error,data){
		
		if (error.code === 11000) {
		  // duplicate key
		  console.log('item not saved');
		  return res.json({
			status: "error",
			error: "You've already been registered",		
		  });
         }
		
		console.log('item saved');
		res.json({ status: "ok" });
	});
	
});

module.exports = app;