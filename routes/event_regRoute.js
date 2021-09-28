const express = require("express");
const app = express.Router();
const bodyParser=require('body-parser');
const stuff = require("../model/events");
const stuff_user = require("../model/user");
const ipl_stuff = require("../model/ipl_auction");

var urlencodedParser = bodyParser.urlencoded({ extended : false });

app.post("/post_ipl",async (req,res)=>{

	var counter1 = 0;
	const ipl_email = req.body.email;
	const ipl_discord = req.body.discord;
	const ipl_data =  await stuff_user.model.findOne({ email: ipl_email }).then(
		(ipl_data)=> {
			ipl_data.discord = ipl_discord;
			for(let i=0; i<ipl_data.events_registered.length; i++){
				if(ipl_data.events_registered[i] === "Ipl Auction"){
					counter1++;
				}
			}
			if(counter1 === 0){
				ipl_data.events_registered.push("Ipl Auction");
			}
			ipl_data.save(function(error, data){
				if(error){
					if(error.code === 11000){
						return res.json({
							status: "error",
							error: "One of the team members have already registered for this event",
						});
					}
					else{
						return res.json({
							status: "error",
							error: "Something went wrong. Please contact Spirit team",	
						});
					}	
				}
				return res.json({
					status: "ok",
					data: ipl_data,
				});
			})
		}
	)
	.catch(
		(error)=>{
			return res.json({
				status: "error",
				error: "One of the member has not registered in this website. Try again after registering",
			});
		}
	)
	
});

app.post("/post/:event_name/:id", urlencodedParser ,async(req, res) => {

	let email = req.body.email_address;
	let name_of_event = req.body.event_name;
	var counter = 0;
	const data = await stuff_user.model.findOne({ email }).then(
		(data)=>{
			for(let i=0; i<data.events_registered.length; i++){
				if(data.events_registered[i] === req.body.event_name){
					counter++;
				}
			}
			if(counter === 0){
				data.events_registered.push(req.body.event_name);
			}
			data.save()});

	if( name_of_event === "shutterbug" ){
		if(counter === 0){	
			var newEntry = await stuff.event.findOne({ event_name: "Shutterbug" }).then(
			(newEntry)=>{
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
							return res.json({
								status: "error",
								error: "You've already registered for this event",		
							});
							}
						else{
							console.log('item not saved');
							return res.json({
								status: "error",
								error: "Something went wrong. Please contact Spirit team",		
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
	}
});	

app.get("/success",(req,res)=>{
	res.render("events/event_reg_success");
});

module.exports = app;