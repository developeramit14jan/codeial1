module.exports.user_post = function(request , response){
    // return response.end('<h1>This is one the post</h1>')
    return response.render('post' , {
        title:"post"
    });
}