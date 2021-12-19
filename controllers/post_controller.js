const Post = require('../models/post');
const Comment = require('../models/comment');
module.exports.user_post = function(request , response){
    // return response.end('<h1>This is one the post</h1>')
    console.log(request.user.id);
    Post.create({content:request.body.content , user:request.user._id} , function(err , post){
        if(err){console.log("Error in creating post"); return;}
        // console.log(post);
        return response.redirect('back');
    } )
    // return response.render('post' , {
    //     title:"post"
    // });
}

// to delete post
module.exports.destroy = function(request , response){
    // request.param.id is used to get id from string parms
    console.log(request.params.id);
    Post.findById(request.params.id , function(error , post){
        // .id means converting the objectid to string
        // request.user.id
        if(error){console.log("error in deleting post" , error); return;}
        console.log(post);
        if(post.user == request.user.id){
            post.remove();
            Comment.deleteMany({post:request.param.id} , function(err){
                return response.redirect('back');
            });
        }else{
            return response.redirect('back');
        }
    })
}