const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
let transporter = nodemailer.createTransport({
    service:'gmail',
    host: 'smtp.gmail.com',
    port:587,
    secure:false,
    auth:{
        user:'kumar.amit14jan@gmail.com',
        pass:'Amit@1999'
        }
});


let renderTemplate = (data , relativePath) =>{
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname , '../views/mailer' , relativePath),
        data,
        function(error , template){
            if(error){console.log("error in rendering template" , error); return;}
            mailHTML = template;
        }
    )

    return mailHTML;

}


module.exports ={
    transporter:transporter,
    renderTemplate :renderTemplate 
}