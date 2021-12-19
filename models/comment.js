const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    // commets belongs to user
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    // comments belongs to post
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'post'
    }

},
{
    timestamps:true
}
) 

const comment = mongoose.model('comment' , commentSchema);
module.exports = comment;