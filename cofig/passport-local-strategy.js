const passport = require('passport');
const User = require('../models/users');

// require the passport local library strategy
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({
    usernameField:'Email'
    // console.log(newUser);
},
function(email , password , done){
      // find user
    
      
      User.findOne({Email : email} , function (error , newUser){
          if(error){console.log("Error in finding the user"); return done(error);}

          if(!newUser || newUser.password != password){
              console.log("Invalid User Name");
              return done(null , false);
          }
        
          return done(null , newUser);
      })

}
));

// seralise user function to decide which key is need to kept in cookie
passport.serializeUser(function(user , done){
    
    done(null , user.id);
})

// deseralise the user from the cookies
passport.deserializeUser(function(id , done){
    User.findById(id , function(error , user){
        if(error){console.log("Error in finding the user"); return done(error);}

        return done(null , user);
    });
})


module.exports = passport;