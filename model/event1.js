const mongoose = require("mongoose");
//Event1 schema
const Event1Schema = new mongoose.Schema(
  {
    item: { type: String, required: true, unique:false},
	user: [{type: mongoose.Schema.Types.ObjectId, ref: 'UserSchema'}],
  });
const Event1 = mongoose.model("Event1", Event1Schema);
module.exports.event1 = Event1;