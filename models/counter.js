const mongoose =require('mongoose')
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
const Counterschema = new Schema({
    counterFor:{
        type:String,
        required : true,
        unique : true
    },
    prefix:{
        type:String,
        required : true,
        unique : true
    },
    count: Number,
    Status: String
});

const Counter = new mongoose.model("counters",Counterschema);

module.exports = Counter;