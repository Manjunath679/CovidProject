const mongoose =require('mongoose')
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
const Userschema = new Schema({
    UserID:{
        type:String,
        required:true,
        unique:true
    },
    userType:{
        type: String,
        required : true
    },
    username:{
        type: String,
        required : true
    },
    email:{
        type: String,
        required : true,
        unique : true
    },
    password:{
            type: String,
            required : true
    }
});

const User = new mongoose.model("users",Userschema);

module.exports = User;