const passport = require('passport');
const User = require('../models/users');

// require the passport local library strategy
const LocalStrategy = require('passport-local').Strategy;
console.log("Amit");
passport.use(new LocalStrategy({
    // here email used is the email pass in form
    usernameField:'email',
    // Consolelog(usernameField)
    // passReqToCallback:true
},
function(email , password , done){
      // find user

      console.log(email , password);
      User.findOne({Email : email} , function (error , newUser){
          if(error){console.log("Error in finding the user"); return done(error);}
          console.log(newUser);

        //   if(!newUser || newUser.password != password){
        //       console.log("Invalid User Name");
        //       return done(null , false);
        //   }
        
          return done(null , newUser);
      })

}
));




// seralise user function to decide which key is need to kept in cookie

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

// deseralise the user from the cookies
passport.deserializeUser(function(id , done){
    User.findById(id , function(error , user){
        if(error){console.log("Error in finding the user"); return done(error);}

        return done(null , user);
    });
})


module.exports = passport;