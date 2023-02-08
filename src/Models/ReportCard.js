const mongoose  = require("mongoose");

const ReportCardSchema = new mongoose.Schema({
    studentName:{
        type:Schema.Types.ObjectId,
        ref:"Student"
    }

})