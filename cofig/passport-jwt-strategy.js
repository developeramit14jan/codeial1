const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;

const ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('../models/users');

let opts ={
    // this is to find the jwt header used for decryption
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey:'codeial' // this is encryption or decription key of tokens;
}
// here done is a call back function
passport.use(new JwtStrategy(opts , function(jwt_payload , done){
    User.findById(jwt_payload._id , function(error , user){
        if(error){console.log("Error in finding user from jwt from user :"); return ;}
        if(user){return done(null , user);}else{ return done(null , false);}
    })

}));

// jwtpayload contains the id of the user 

module.exports = passport;  