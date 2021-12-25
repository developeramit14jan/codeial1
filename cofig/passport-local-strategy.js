const passport = require('passport');
const User = require('../models/users');

// require the passport local library strategy
const LocalStrategy = require('passport-local').Strategy;
console.log("Amit");
passport.use(new LocalStrategy({
    // here email used is the email pass in form
    usernameField:'email',
    passReqToCallback:true,
    // Consolelog(usernameField)
    // passReqToCallback:true  this tell us to pass the request to call back

},
function(request , email , password , done){
      // find user

      console.log(email , password);
      User.findOne({Email : email} , function (error , newUser){
          if(error){request.flash('error' , error); return done(error);}
          console.log(newUser);
// here Password used is the models Password
          if( !newUser || newUser.Password != password){
            request.flash('error' , "Invalid Username/ Password");
              return done(null , false);
          }
        
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


//check that the user is authenticate or not
passport.checkAuthentication = function(request, response , next){
    // if the user is sign in  then pass the request to the next function
   if(request.isAuthenticated()){
       return next();
   }
// if user is not sign in then send the user to the signin page
   return response.redirect('/user/signin');
}


// if the user is signin
passport.setAuthenticatedUser = function(request , response , next){
    if(request.isAuthenticated()){
        //request.user contains current signin user from the session cookie
        // helps to assess the locals in the views
        //here response.local is storing the data
        response.locals.user = request.user;
    }
    next();
}



module.exports = passport;