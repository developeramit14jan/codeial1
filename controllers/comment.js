const Comment = require('../models/comment');
const Post = require('../models/post');
const emailWorker = require('../worker/comment_email_worker');
const queue = require('../cofig/kue')


const commentMailer = require('../mailer/comment_mailer');
module.exports.createcomment = async function(request , response){
    // here the request .body.post used is the hidden part of the comment form
    // console.log(post._id);
//    let post = await Post.findById((post._id)) ;
      let post = await Post.findById(request.body.post);
        // if(err){console.log("Error in finding the post"); return;}
        let comment;
        if(post){
            comment = await Comment.create({
                content:request.body.content,
                post:request.body.post,
                user:request.user._id
            });
                //handle error
                
                post.comments.push(comment);
                
                post.save(); //to save in 
                // .exc not working
                comment = await comment.populate('user');
                // commentMailer.newComment(comment);

                //creating queue
               let job =  queue.create('emails' , comment).save(function(error){
                    if(error){console.log('error in creating queue');}
                    console.log("This is job enqueue",job.id);
                })

                console.log(comment);
                 response.redirect('/');
            }
            
        }
    




// to delete the comment
module.exports.destroy = function(request , response){
    Comment.findById(request.params.id , function(err , comment){
        if(comment.user == request.user.id){
            let postId = comment.post;
            comment.delete();
            // here the comment will be pull and thrown 
            Post.findByIdAndUpdate(postId , {$pull :{comments :request.param.id}} , function(err , post){
                return response. redirect('back');
            })
        }else{
            return response.redirect('back');
        }
    })
}