const Comment = require('../models/comment');
const Post = require('../models/post');
module.exports.createcomment = function(request , response){
    // here the request .body.post used is the hidden part of the comment form
    console.log(post._id);
    Post.findById((post._id) , function(err , post){
        if(err){console.log("Error in finding the post"); return;}
        if(post){
            Comment.create({
                content:request.body.content,
                post:request.body.post,
                user:request.user._id
            },  function(error , comment){
                //handle error
                
                post.comments.push(comment);
                
                post.save(); //to save in db
                console.log(comment);
                 response.redirect('/');
            }
            )
        }
    })
}



// to delete the comment
module.exports.destroy = function(request , response){
    Comment.findById(request.params.id , function(err , comment){
        if(comment.user == request.user.id){
            let postId = comment.post;
            comment.delete();
            // here the comment will be pull and thrown 
            Post.findByIdAndUpdate(postId , {$pull :{comments :request.param.id}} , function(err , post){
                return response.redirect('back');
            })
        }else{
            return response.redirect('back');
        }
    })
}