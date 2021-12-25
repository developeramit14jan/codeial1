module.exports.setflashMessage = function(request , response , next){
    response.locals.flash={
        'success':request.flash('success'),
        'error':request.flash('error')
    }

    next();
}