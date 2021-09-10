const mongoose = require("mongoose");
//Event schema

const Event1Schema = new mongoose.Schema(
  {
    user_object_id: [{type: mongoose.Schema.Types.ObjectId, ref: 'UserSchema', unique:true}],
    event_name: { type: String, required: true, unique:false},
    field1: { type: String, required: false, unique:false},
    field2: { type: String, required: false, unique:false},
    field3: { type: String, required: false, unique:false}

  });
const Event1 = mongoose.model("Event1", Event1Schema);
module.exports.event1 = Event1;

const Event2Schema = new mongoose.Schema(
  {
    user_object_id: [{type: mongoose.Schema.Types.ObjectId, ref: 'UserSchema', unique:true}],
    event_name: { type: String, required: true, unique:false},
    field1: { type: String, required: false, unique:false},
    field2: { type: String, required: false, unique:false},
    field3: { type: String, required: false, unique:false}

  });
const Event2 = mongoose.model("Event2", Event2Schema);
module.exports.event2 = Event2;
