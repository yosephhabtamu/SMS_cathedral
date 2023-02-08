const mongoose  = require("mongoose");
const AssessmentSchema = new mongoose.Schema({
    studentName:{
        type:Schema.Types.ObjectId,
        ref:"Student",
        required:true
    },
    Teacher:{
        type:Schema.Types.ObjectId,
        ref:"Teacher",
        required:true
    },
    test1:{
        type:Number,
        max:20,
        min:0,
        default:0
    },
    test2:{
        type:Number,
        max:20,
        min:0,
        default:0
    },
    final:{
        type:Number,
        max: 60,
        min:0,
        default:0
    },
    other:{
        type:Number,
        default:0
    }
})

const Assessment = new mongoose.Model("Assessment", AssessmentSchema)

export{Assessment}