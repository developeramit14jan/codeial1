// export the user models

const User = require('../models/users');
module.exports.usersProfile = function(request , response){

    if(request.cookies.userdb_id){
        User.findById(request.cookies.userdb_id , function(err , user){
            if(user){
                return response.render('users',{
                    title:"profile",
                    User : user
                });

            }
            return response.redirect('/user/signin');
        });
    }else{
        return response.redirect('/user/signin');
    }
    // return response.end("This is user profile");
    // return response.render('users' , {
    //     title:"users Page"
    // });
}

// render signup
 
module.exports.signup = function(request , response){
    return response.render('Signup',{
        title :"Sign up | codeial"
    })
}
// render login page
module.exports.Signin = function(request , response){
    return response.render('Signin',{
        title:"sign in | codeial"
    });
}

//get sigiup data
module.exports.create =function(request , response){
    console.log(request.body.Email );
    console.log(request.body.Password);
    
    if(request.body.Password != request.body.Confirm_password){
        return response.redirect('back');
    }
    // find the user if it exist or not
    User.findOne({Email:request.body.Email} , function(err , userfdb){
        if(err){console.log("error in finding"); return;}
        console.log(userfdb);

        if(!userfdb){
            User.create({Email:request.body.Email , Password:request.body.Password}, function(err , newuser){
                if(err){console.log("error in creating" , err) ; return ;}
                console.log(newuser);
                return response.redirect('/user/signin');
            });
        }else{
            return response.redirect('back');
        }

    });
}

// signin and create session for user
module.exports.createSession = function(request , response){
    console.log(request.body)
    return response.redirect('/');
    // code from library passport.js

    // code from manual authentication
    // //find the user
    
    // User.findOne({Email:request.body.email} , function(err , userdb){
    //     if(err){console.log("error"); return;}
    //     // console.log(userdb.Password);
    //     if(userdb){
    //         // if user found but password not match
    //         if(userdb.Password != request.body.password){
    //             return response.redirect('back');
    //         }
    //         response.cookie('userdb_id', userdb.id);  // this is setting cookie
    //         return response.redirect('/user/profile');
    //     }else{
    //         return response.end('back');
    //     }
    // });
}


// delete the cookies and alter cookie
module.exports.deleteCookie = function(request , response){
    // response.clearCookie('userdb_id');
    // response.cookies
    // console.log(request.cookies);
    request.cookies = 123;
    response.cookie('userdb_id' , 12);
    
    return response.render('Signin',{
        title:"SignIn | codeial"
    });
}