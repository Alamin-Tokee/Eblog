const mongoose = require("mongoose");

const mongo_url = process.env.MONGO_CONNECTION_URL;

function connectDB(){
    const connect = mongoose.connect(mongo_url, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    });
    
    connect.then(
        (db) =>{
            console.log("Database Connected Successfully");
        }, 
        (err) =>{
            console.log("Error occur while connecting ", err);
        }
    );
    
}

module.exports = connectDB;
