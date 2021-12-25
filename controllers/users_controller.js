// export the user models
const fs = require('fs');
const path = require('path');
const User = require('../models/users');
module.exports.usersProfile = function(request , response){

    // if(request.cookies.userdb_id){
    //     User.findById(request.cookies.userdb_id , function(err , user){
    //         if(user){
    //             return response.render('users',{
    //                 title:"profile",
    //                 User : user
    //             });

    //         }
    //         return response.redirect('/user/signin');
    //     });
    // }else{
    //     return response.redirect('/user/signin');
    // }
    // return response.end("This is user profile");
    User.findById(request.params.id , function(error , user){
        return response.render('users' , {
                title:"users Page",
                profile_user:user
            });
    })
    // return response.render('users' , {
      //     title:"users Page"
    // });
}

// updating the page
module.exports.update = async function(request , response){
    // cuirrent user login will be
    // if(request.user.id == request.params.id){
    //     User.findByIdAndUpdate(request.params.id ,{Name : request.body.name , Email:request.body.email} , function(error  , user){
    //         return response.redirect('back');
    //     });
    // }else{
    //     return response.status(401).send('Un Authorise');
    // }

    if(request.user.id == request.params.id){
        try{
            let user = await User.findById(request.params.id);
            // here multer process the request and pass to the function
            User.uploadAvtar(request , response , function(error){
                if(error){console.log('********Multer Error' , error)}
                console.log(request.file);
                user.Name = request.body.name;
                user.Email = request.body.email;
                if(request.file){
                    if(user.avatar){
                        // this check wether file exist or not
                        if(fs.existsSync(path.join(__dirname , '..' , user.avatar))){
                            // this is deleting a file
                            fs.unlinkSync(path.join(__dirname , '..' , user.avatar))
                        }
                        
                        
                    }
                    // this is saveing the path of uploaded file in the avatar field in user
                    user.avatar = User.avatarPath +'/'+ request.file.filename;
                

                } 
                  user.save();
                  return response.redirect('back');

            
            });
        }catch(error){
            request.flash('error' , error);
            return response.redirect('back');
        }
    }else{
        return response.status(401).send('Un Authorise');
    }


}

// render signup
 
module.exports.signup = function(request , response){
    //
    if(request.isAuthenticated()){
        return response.redirect('/user/profile');
    }
    return response.render('Signup',{
        title :"Sign up | codeial"
    })
}
// render login page
module.exports.Signin = function(request , response){
// here use the authenticated use 
    if(request.isAuthenticated()){
        return response.redirect('/user/profile');
    }else{

    
    return response.render('Signin',{
        title:"sign in | codeial"
    });
}}

//get sigiup data
module.exports.create =function(request , response){
    // console.log(request.body.Email );
    // console.log(request.body.Password);
    
    if(request.body.Password != request.body.Confirm_password){
        return response.redirect('back');
    }
    // find the user if it exist or not
    User.findOne({Email:request.body.Email} , function(err , userfdb){
        if(err){console.log("error in finding"); return;}
        console.log(userfdb);

        if(!userfdb){
            User.create({Name :request.body.Name, Email:request.body.Email , Password:request.body.Password}, function(err , newuser){
                if(err){console.log("error in creating" , err) ; return ;}
                // console.log(newuser);
                return response.redirect('/user/signin');
            });
        }else{
            return response.redirect('back');
        }

    });
}

// signin and create session for user
module.exports.createSession = function(request , response){
    // console.log(request.body)
     //use flash message
     request.flash("success" , 'Login in Successfully')
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
    //         console.log(userdb.id);
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

// cresting controller to destroy session

module.exports.destroySession = function(request , response){
    request.logout(); // function given from passport.js
    //flash message
    request.flash("success" , "Logged out SuccessFully")
    return response.redirect('/');
}


// sign_in link

module.exports.userSignIn = function(request , response){
    return response.redirect('/user/signin');
}