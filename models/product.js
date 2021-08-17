const mongoose =require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
const Productschema = new Schema({
    product_id:{
        type:String,
        required:true,
        unique:true
    },
    product_name_standard:{
        type: String,
        required : true
    },
    product_name_common:{
        type: String,
        required : true
    },
    product_state:{
        type: String,
        required : true
    },
    product_sub_state:{
        type: String
    },
    product_size_in_mm:{
        type: Number
    },
    product_specialty:{
        type: String
    },
    product_grade:{
        type: String,
        required : true
    },
    product_brand:{
        type:String,
        required:true
    },
    product_weight:{
        type:Number,
        required:true
    },
    product_package:{
        type:String,
        required:true
    },
    product_description:{
        type:String,
        required:true
    }

    
});

const Products = new mongoose.model("products",Productschema);

module.exports = Products;