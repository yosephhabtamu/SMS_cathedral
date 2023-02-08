const mongoose  = require("mongoose");

const SectionSchema = new mongoose.Schema({
    teachers:
     [{ type:Schema.Types.ObjectId,
        ref:"Teacher"}]
    ,
    grade:{
        type:Number,
        required:true,
        min:1,
        max:12, 
    },
    section:{
        type:String,
        required:true,
        length:{
            maxlength:1,    
        }
    },
    capacity:{
        type:Number,
        required:true
    },
    studentsResult:[{
        type:Schema.Types.ObjectId, ref:"Assessment"
    }]

})


const Section  = new mongoose.model("Section", SectionSchema)

exports.Section = Section;