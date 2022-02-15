const mongoose = require("mongoose");

var commentSchema = mongoose.Schema({
    test: String,
    author: {
        id: {
            type: mongoose.Types.ObjectId,
            ref: "User",
        },
        username: String,
    },
});

module.exports = mongoose.model("Comment", commentSchema);