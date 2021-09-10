const express = require("express");
const app = express.Router();
const bodyParser=require('body-parser');
const stuff = require("../model/events");
const stuff_user = require("../model/user");

var urlencodedParser = bodyParser.urlencoded({ extended : false });


app.post("/post/:id", urlencodedParser ,async(req, res) => {

	let email = req.body.email;
	const data = await stuff_user.model.findOne({ email }).then(
		(data)=>{
			let counter=0;
			for(let i=0; i<data.events_registered.length; i++){
				if(data.events_registered[i] === req.body.event_name){
					counter++;
				}
			}
			if(counter === 0){
				data.events_registered.push(req.body.event_name);
			}
			// console.log(counter);
		    data.save()});

        
    if(req.body.event_name === 'Event1'){
		console.log('Entered Event1');
		var newEvent1 = stuff.event1();
		newEvent1.event_name = req.body.event_name;
		newEvent1.field1 = req.body.field1;
		newEvent1.field2 = req.body.field2;
		newEvent1.field3 = req.body.field3;
		newEvent1.user_object_id.push(req.params.id);
				
		newEvent1.save(function(error,data){
			
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
						status: "error",
						error: "Something went wrong. Please contact Spirit team",		
					});
				}   
			}	
			console.log('item saved');
			res.json({ status: "ok" });
		});
	}
	

	else if(req.body.event_name === 'Event2'){

		console.log('Entered Event2');
		var newEvent2 = stuff.event2();
		newEvent2.event_name = req.body.event_name;
		newEvent2.field1 = req.body.field1;
		newEvent2.field2 = req.body.field2;
		newEvent2.field3 = req.body.field3;
		newEvent2.user_object_id[0] = req.params.id;
			
		newEvent2.save(function(error,data){
			
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
					  status: "error",
					  error: "Something went wrong. Please contact Spirit team",	
					});
				}   
			}	
			console.log('item saved');
			res.json({ status: "ok" });
		});
	}	
});

module.exports = app;