const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var passwordLocalMongoose = require("passport-local-mongoose");

var UserSchema = new Schema({
    username: String,
    password: String,
});

UserSchema.plugin(passwordLocalMongoose);

module.exports = mongoose.model("User", UserSchema);