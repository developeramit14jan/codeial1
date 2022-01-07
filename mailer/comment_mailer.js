const nodeMailer = require('../cofig/NodeMailer');
// const 



// another way of exporting function
exports.newComment  = (comment) => {
    console.log('Inside New Comment' , comment);
    let htmlString = nodeMailer.renderTemplate ({comment:comment},'/comments/new_comment.ejs' );
    nodeMailer.transporter.sendMail({
        from:"kumar.amit14jan@gmail.com",
        // send mail who comment
        to :comment.user.Email,
        subject:"New Comment Publish",
        html: htmlString
    }, (error , info)=>{
        if(error){console.log('Error in sending mail' , error); return;}
        console.log('Message Send' , info);
        return;
    }
    
    )
}