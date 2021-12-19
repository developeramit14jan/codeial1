const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
    content:{
        type : String,
        required : true
    },
    // we are linking to user
    user :{
        type :mongoose.Schema.Types.ObjectId,
        // here in reference (ref) name pass will be the name of the model whose 
        // you want to connect 
        ref:'user'
    },
    // include the array of ids of all the comments in this post itself
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'comment'  
        }
    ]
},{
    timestamps:true
}
)

const post = mongoose.model('post' , postSchema);
module.exports = post;