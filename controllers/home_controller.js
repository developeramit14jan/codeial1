const post = require('../models/post');
const user = require('../models/users');
// creating the controller
// syntax that we have to follow 
// modules.exports.action_Name = function(request , response){}
module.exports.home = function(request , response){
    // console.log(request.cookies)
    // return response.end("The express js is running ");
    // post.find({}, function(error , posts){
    //     if(error){console.log(error); return;}
    //     return response.render('home' ,{
    //         title:"home",
    //         posts: posts
    //     });
    // })


    // populating the user post
    // in populate value pass will be the name of the name of the field of the post_schema
    post.find({}).
    populate('user').populate({
        path:'comments',
        populate:{
            path:'user'
        }
    })
    .exec(function(err , posts){
        if(err){console.log("ERROR");return;}

        user.find({} , function(err , users){
            if(err){console.log("Error in finding User");return;}
            console.log(user.Email);
            return response.render('home',{
                title:"codeial | Home",
                posts:posts,
                all_users :users

            })

        })
        // return response.render('home',{
        //     title:"codeial | Home",
        //     posts:posts
        // })
    })
}