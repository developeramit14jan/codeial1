const queue = require("../cofig/kue");

const commentMailer = require('../mailer/comment_mailer');

queue.process('emails' , function(job , done){
    console.log('emails worker is processing the job' , job.data);
    commentMailer.newComment(job.data);
    done();
});