const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema({
  fname: String,
  lname: String,
  email: String,
  phone: String,
  pass: String,
  cpass: String,
});

// Add the passport-local-mongoose plugin
UserSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", UserSchema);
module.exports = User;
