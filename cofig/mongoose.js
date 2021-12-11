const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/codeial_developement');

const db = mongoose.connection;

// checking error
db.on('error' , console.error.bind(console , "error"));

// checking db connection
db.once('open' , function(){
    console.log("Database connected successfully:");
})

module.exports = db;