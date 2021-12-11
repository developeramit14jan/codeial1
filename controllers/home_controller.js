// creating the controller
// syntax that we have to follow 
// modules.exports.action_Name = function(request , response){}
module.exports.home = function(request , response){
    console.log(request.cookies)
    // return response.end("The express js is running ");
    return response.render('home' ,{
        title:"home"
    });
}