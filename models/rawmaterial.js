const mongoose =require('mongoose')
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
const Rawmaterialschema = new Schema({

    material_id:{
        type:String,
        required:true,
        unique:true
    },
    material_name_standarde:{
        type: String,
        required : true
    },
    material_name_common:{
        type: String,
        required : true
    },
    material_state:{
        type: String,
        required : true
    },
    material_sub_state:{
        type: String
    },
    material_size_in_mm:{
        type: Number
    },
    material_specialty:{
        type: String
    },
    material_grade:{
        type: String,
        required : true
    },
    material_for:{
        type:String,
        required:true
    }
});

const Rawmaterial = new mongoose.model("rawmaterial",Rawmaterialschema);

module.exports =Rawmaterial;