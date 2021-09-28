const express = require("express");
const app = express.Router();
const bodyParser=require('body-parser');
const stuff = require("../model/events");
const stuff_user = require("../model/user");
const ipl_stuff = require("../model/ipl_auction");

var urlencodedParser = bodyParser.urlencoded({ extended : false });


app.post("/post/:event_name/:id", urlencodedParser ,async(req, res) => {

	if((req.params.event_name) === "IplAuction"){
		
		var email1 = req.body.email_address1;
		var email2 = req.body.email_address2;
		var email3 = req.body.email_address3;
		var team_name = req.body.team_name;
		var counter1 = 0;var counter2 = 0;var counter3 = 0;
		const data1 = await stuff_user.model.findOne({ email1 }).then(
			(data1)=>{
				// console.log(data);
				for(let i=0; i<data1.events_registered.length; i++){
					if(data1.events_registered[i] === req.body.event_name){
						counter1++;
					}
				}
			})
		.catch(
			(error)=>{
						return res.json({
						status: "error",
						error: "Member 1 has not registered in this site. Try again after registering this member",		
					});
			});
		
		const data2 = await stuff_user.model.findOne({ email2 }).then(
			(data2)=>{
				// console.log(data);
				for(let i=0; i<data2.events_registered.length; i++){
					if(data2.events_registered[i] === req.body.event_name){
						counter2++;
					}
				}
			})
		.catch(
			(error)=>{
						return res.json({
						status: "error",
						error: "Member 2 has not registered in this site. Try again after registering this member",		
					});
			});
		
		const data3 = await stuff_user.model.findOne({ email3 }).then(
			(data3)=>{
				// console.log(data);
				for(let i=0; i<data3.events_registered.length; i++){
					if(data3.events_registered[i] === req.body.event_name){
						counter3++;
					}
				}
			})
		.catch(
			(error)=>{
						return res.json({
						status: "error",
						error: "Member 3 has not registered in this site. Try again after registering this member",		
					});
			});
		
		const data4 = await ipl_stuff.iplauction.findOne({ teamname: team_name }).then(
			(team) => {
			return res.json({
			status: "error",
			error: "Team Name already taken. Try using another name",	
			});	
		}).catch(
			(error)=>{
				console.log(error);
			}
		);

		if(counter1 === 0 && counter2 === 0 && counter3 === 0){	
			var newTeam = await ipl_stuff.iplauction
				.create({
				  team_name,
				  data1,
				  data2,
				  data3,
				})
				.then((response) =>
					  {					
						data1.events_registered.push(req.body.event_name);		
					    data2.events_registered.push(req.body.event_name);
						data3.events_registered.push(req.body.event_name);
						data1.save();
						data2.save();
						data3.save();
						res.send({ status: "ok" })
				     }
				)
				.catch((error) => {
				  console.log(error.message);
				  if (error.code === 11000) {
					// duplicate key
					return res.json({
					  status: "error",
					  error:
						"One of the participants is already registered in another team",
					});
				  }
				return res.send({
					status: "error",
					error:
					  "Something went wrong. Contact Spirit 2021 team if you are not able to register",
				  });
				});
		}
		else{
			
			return res.json({
			status: "error",
			error: "One of the participants is already registered in another team",	
			});	
			
		}	
	}
	else{
		let email = req.body.email_address;
		// console.log(email);
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
	}

});	

app.get("/success",(req,res)=>{
	res.render("events/event_reg_success");
});


module.exports = app;