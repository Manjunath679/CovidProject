const mongoose =require('mongoose')
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
const package_utility_schema = new Schema({
    
    package_utility_id:{
        type:String,
        required:true,
        unique:true
    },
    package_utility_category:{
        type: String,
        required : true
    },
    package_utility_sub_category:{
        type: String,
        required : true
    },
    package_utility_material:{
        type: String,
        required : true
    },
    package_utility_brand:{
        type: String,
        required : true
    },
    package_utility_grade:{
        type: String,
        required : true
    },
    package_utility_volume_weight:{
        type: Number,
        required : true

    }
});

const Package_utility = new mongoose.model("package_utility",package_utility_schema);

module.exports =Package_utility;