const User = require('../../../models/users');
//import json web token library
const jwt = require('jsonwebtoken');

module.exports.createSession = async function(request , response){
    console.log(request.body);
    let user = await User.findOne({Email:request.body.Email} );
    console.log(user);
    // if(!user){

    //     return response.json(422 , {
    //         message:"Invalid user Name and Password"
    //     });
        return response.json(200 , {
            message:"sign in successfully this is the token",
            data: {
                // here the key we have used is the codeial
                token :jwt.sign(user.toJSON() , 'codeial' , {expiresIn :'100000'})
            }
        });

    }
