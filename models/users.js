const mongoose = require('mongoose');
// creating schema
const userschems = new mongoose.Schema({
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

const User = mongoose.model('user', userschems);
 module.exports = User;


