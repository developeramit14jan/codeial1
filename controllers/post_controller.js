const Post = require('../models/post');
const Comment = require('../models/comment');
module.exports.user_post = async function(request , response){
    // return response.end('<h1>This is one the post</h1>')
    // console.log(request.user.id);
    let post = await Post.create({content:request.body.content , user:request.user._id});
    // Post.create({content:request.body.content , user:request.user._id} , function(err , post){
        // if(err){console.log("Error in creating post"); return;}
        // console.log(post);
        if(request.xhr){
            return response.status(200).json({
                data:{
                    post:post
                },
                message:"post created"
            });
            
        }
        request.flash('success' , "Post created Successfully! ");
        // here flash variable comes from index.js
        return response.redirect('back');
    // } )
    // return response.render('post' , {
    //     title:"post"
    // });
}

// to delete post
module.exports.destroy = async function(request , response){
    // request.param.id is used to get id from string parms
    // console.log(request.params.id);
    // converting code to async await

    let post = await Post.findById(request.params.id) 
        // .id means converting the objectid to string
        // request.user.id
        // if(error){console.log("error in deleting post" , error); return;}
        // console.log(post);
        if(post.user == request.user.id){
            post.remove();
           await Comment.deleteMany({post:request.param.id} );
           request.flash('success' , "Post and associated comment delete!")
           return response.redirect('back');
        }else{
            request.flash('error' , "you are not allow to delete this post!")
            return response.redirect('back');
        }
    // })
}