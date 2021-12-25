const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/users');


//tell passport to use this new strategy for google login
passport.use(new googleStrategy({
    clientID:"841620686929-g0dqqhm1ovmlolao8hhrv5v5c6dkner3.apps.googleusercontent.com",
    clientSecret:'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',
    callbackURL:"http://localhost:8000/user/auth/google/callback"
},
     function(accessTockon , refreshToken , profile , done){
         // find the user if found then set user as request as user
         User.findOne({Email:profile.emails[0].value}).exec (function(error , user){
             if(error){console.log('Error in google ' , error); return;}
             console.log(profile);
             if(user){
                 return done(null , user);
             }else{
                 User.create({
                     Name:profile.displayName,
                     Email:profile.emails[0].value,
                     Password:crypto.randomBytes(20).toString('hex')
                 },
                      function(error , user){
                        if(error){console.log('Error in creating user: ' , error); return;}
                        return done(null , user);
                      }
                 )
             }
         })
     }
));


module.exports = passport; 