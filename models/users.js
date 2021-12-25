const mongoose = require('mongoose');
// creating schema
const multer = require('multer');
const path = require('path');
// path can be use for handling and transforming the file path

const Avtar_Path = path.join('/upload/users/avtars'); // path where all user profile pic are uploaded

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
    } ,
    avatar :{
        type:String
    }      
}, {timestamps:true});


let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname , '..' , Avtar_Path))
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname  + Date.now())
    }
  });

 
  // static function  
  // here single('filename) here file name will be same as the name pass in form
user.statics.uploadAvtar =  multer({storage : storage}).single('Avtar');     
  user.statics.avatarPath = Avtar_Path;  // to make this path public available
const User = mongoose.model('user', user);
 module.exports = User;


