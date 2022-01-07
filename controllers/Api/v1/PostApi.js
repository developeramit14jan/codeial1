const comment = require('../../../models/comment');
const Post =require('../../../models/post');
// const comment = require('../../../models/comment')
module.exports.index = async function(request , response){
    // from this we are sending the json formate data

    let posts = await Post.find({}).
        populate('user').populate({
            path:'comments',
            populate:{
                path:'user'
            }
        })
    return response.json(200 , {
        message:"List Of Post" ,  
        Posts:posts
    //     firstName :"Amit",
    //     lastName:"Kumar",
    //     age:33,
    //     single:true
    });
}


module.exports.destroy = async function(request , response){
    try{
        let post = await Post.findById(request.params.id);
        if(post.user == request.user.id){
            post.remove();
            await comment.deleteMany({post:request.params.id});
            return  response.json(200 , {
                message :"Message is deleted"
            });
        }else{
            return response.json(401 ,
                {
                    message:"You can not delete this post"
                })
          
        }
    }catch(error){
        return response.json(500 ,
            {
                message:"Internal Server error"
            })
    }
}