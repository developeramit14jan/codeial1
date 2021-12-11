// export the user models

const User = require('../models/users');
module.exports.usersProfile = function(request , response){
    // return response.end("This is user profile");
    return response.render('users' , {
        title:"users Page"
    });
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

        if(!userfdb){
            User.create({Email:request.body.Email , Password:request.body.Password}, function(err , newuser){
                if(err){console.log("error in creating" , err) ; return ;}
                console.log(newuser);
                return response.redirect('/user/signin');
            });
        }else{
            return response.redirect('back');
        }

    })
        
    
        // return response.redirect('back');

    
}