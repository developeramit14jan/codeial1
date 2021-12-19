const mongoose = require('mongoose');
// creating schema
const user = new mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    Email:{
        type :String,
        required:true,
        unique :true
    },
    Password:{
        type:String,
        required:true
    }       
}, {timestamps:true});

const User = mongoose.model('user', user);
 module.exports = User;


