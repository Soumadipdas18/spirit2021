const express = require("express");
const app = express.Router();
const bodyParser=require('body-parser');
const stuff = require("../model/events");
const stuff_user = require("../model/user");

var urlencodedParser = bodyParser.urlencoded({ extended : false });


app.post("/post/:id", urlencodedParser ,async(req, res) => {

	let email = req.body.email_address;
	console.log(email);
	let name_of_event = req.body.event_name;
	var counter = 0;
	const data = await stuff_user.model.findOne({ email }).then(
		(data)=>{
			// console.log(data);
			for(let i=0; i<data.events_registered.length; i++){
				if(data.events_registered[i] === req.body.event_name){
					counter++;
				}
			}
			if(counter === 0){
				data.events_registered.push(req.body.event_name);
			}
		    data.save()});
	
    if(counter === 0){	
		var newEntry = await stuff.event.findOne({ event_name: "Shutterbug" }).then(
		(newEntry)=>{
			console.log(req.body.contact_number);
			console.log(newEntry);
			newEntry.contact_number.push(req.body.contact_number);
			newEntry.email_address.push(req.body.email_address);
			newEntry.full_name.push(req.body.full_name);
			newEntry.college.push(req.body.college);
			newEntry.user_object_id.push(req.params.id);
			newEntry.save(function(error, data){			
				if(error){
					if (error.code === 11000) {
						// duplicate key
						console.log('item not saved');
						// console.log(error);
						return res.json({
							status: "error",
							error: "You've already registered for this event",		
						});
						}
					else{
						console.log('item not saved');
						return res.json({
							// console.log(error);
							status: "error",
							error: "Something went wrong. Please contact Spirit team ${error.message}",		
						});	
					}   
				}
				console.log('item saved');
				return res.json({ status: "ok" });
			})
		})		
		.catch((err)=>{
				console.log(err);
		})
	}	
	else{
		    console.log(counter);
			return res.json({
			status: "error",
			error: "You've already registered for this event",		
		});	
	}		

});	

app.get("/success",(req,res)=>{
	res.render("events/event_reg_success");
});


module.exports = app;