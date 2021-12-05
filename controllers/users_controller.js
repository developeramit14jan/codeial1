module.exports.usersProfile = function(request , response){
    // return response.end("This is user profile");
    return response.render('users' , {
        title:"users Page"
    });
}